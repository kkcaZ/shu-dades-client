// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use tauri::Manager;
mod broadcast;
use broadcast::{Message, BroadcastSubscribeBody};
use std::io::prelude::*;
use std::net::{TcpStream, TcpListener};
use std::sync::{Mutex, Once};
use rand::Rng;

static mut GLOBAL_TCP_STREAM: Option<Mutex<TcpStream>> = None;
static mut GLOBAL_LISTENER_PORT: Option<Mutex<String>> = None;
static INIT: Once = Once::new();

fn main() {
    initialize_tcp();

    tauri::Builder::default()
    .setup(|app| {
        #[cfg(debug_assertions)]
        {
            let window = app.get_window("main").unwrap();
            window.open_devtools();
        }

        let app_handle = app.handle();
        tauri::async_runtime::spawn(async move {
            listen_for_connections(&app_handle).await;
        });
        Ok(())
    })
    .invoke_handler(tauri::generate_handler![send_tcp_message])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

fn initialize_tcp() {
    INIT.call_once(|| {
        let mut rng = rand::thread_rng();
        let port = rng.gen_range(30000..40000).to_string();
        let tcp_stream = TcpStream::connect("localhost:8080").expect("Failed to connect to address");
        let local_addr = tcp_stream.local_addr().unwrap().to_string();
        unsafe {
            GLOBAL_TCP_STREAM = Some(Mutex::new(tcp_stream));
            GLOBAL_LISTENER_PORT = Some(Mutex::new(port.clone()));
        }

        subscribe_to_broadcast(local_addr, port);
    });
}

fn subscribe_to_broadcast(local_addr: String, port: String) {
    let body = BroadcastSubscribeBody {
                subscribe_address: "localhost:".to_string() + &port,
                publish_address: local_addr
            };

    let message = Message {
        body: body,
        method: "POST".to_string(),
        route: "/broadcast/subscribe".to_string()
    };

     _ = send_tcp_message(serde_json::to_string(&message).unwrap());
}

async fn listen_for_connections<R: tauri::Runtime>(manager: &impl Manager<R>) {
    println!("Listening for messages");
    let mutex = unsafe { GLOBAL_LISTENER_PORT.as_ref().expect("Port not initialized") };
    let port = mutex.lock().expect("Failed to lock port");
    let listener = TcpListener::bind("localhost:".to_string() + &port).expect("Failed to bind to address");
    loop {
        match listener.accept() {
            Ok((mut stream, _)) => {
                let mut buffer = [0; 4096];
                stream.read(&mut buffer).unwrap();
                let message = &String::from_utf8_lossy(&buffer[..]);
                let message = message.trim_end_matches(char::from(0));
                println!("Received message: {}", message);
                manager.emit_all("broadcast_event", message).unwrap();

                let _ = stream.shutdown(std::net::Shutdown::Both);
            }
            Err(e) => {
                eprintln!("Error accepting connection: {}", e);
            }
        }
    }
}

#[tauri::command]
fn send_tcp_message(message: String) -> String {
    println!("Sending Message: {}", message);

    let mutex = unsafe { GLOBAL_TCP_STREAM.as_ref().expect("TcpStream not initialized") };
    let mut stream = mutex.lock().expect("Failed to lock TcpStream");

    stream.write(&message.as_bytes()).unwrap();

    let mut buffer = [0; 4096];
    stream.read(&mut buffer).unwrap();
    let response = &String::from_utf8_lossy(&buffer[..]);
    let response = response.trim_end_matches(char::from(0));
    println!("Response: {}", response);

    return response.to_string();
}