// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use std::io::prelude::*;
use std::net::TcpStream;

fn main() {
  tauri::Builder::default()
    .invoke_handler(tauri::generate_handler![send_tcp_message])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");
}

#[tauri::command]
fn send_tcp_message(message: String) -> String {
    println!("Sending Message: {}", message);

    let mut stream = TcpStream::connect("localhost:8080").unwrap();
    stream.write(&message.as_bytes()).unwrap();

    let mut buffer = [0; 128];
    stream.read(&mut buffer).unwrap();
    let response = String::from_utf8_lossy(&buffer[..]);
    return response.to_string()
}