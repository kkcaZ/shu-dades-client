// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

#[cfg(debug_assertions)]
use tauri::Manager;

use std::io::prelude::*;
use std::net::TcpStream;
use std::sync::{Mutex, Once};

static mut GLOBAL_TCP_STREAM: Option<Mutex<TcpStream>> = None;
static INIT: Once = Once::new();

fn initialize_global_tcp_stream() {
    INIT.call_once(|| {
        let tcp_stream = TcpStream::connect("localhost:8080").expect("Failed to connect to address");
        unsafe {
            GLOBAL_TCP_STREAM = Some(Mutex::new(tcp_stream));
        }
    });
}

fn main() {
    initialize_global_tcp_stream();

    tauri::Builder::default()
    .setup(|_app| {
    #[cfg(debug_assertions)]
    {
    let window = _app.get_window("main").unwrap();
    window.open_devtools();
    }
    Ok(())
    })
    .invoke_handler(tauri::generate_handler![send_tcp_message])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn send_tcp_message(message: String) -> String {
    let mutex = unsafe { GLOBAL_TCP_STREAM.as_ref().expect("TcpStream not initialized") };
    let mut stream = mutex.lock().expect("Failed to lock TcpStream");

    println!("Sending Message: {}", message);
    stream.write(&message.as_bytes()).unwrap();

    let mut buffer = [0; 4096];
    stream.read(&mut buffer).unwrap();
    let response = String::from_utf8_lossy(&buffer[..]);
    let response = response.trim_end_matches(char::from(0));
    println!("Response: {}", response);
    return response.to_string()
}