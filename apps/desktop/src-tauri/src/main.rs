#![cfg_attr(
  all(not(debug_assertions), target_os = "windows"),
  windows_subsystem = "windows"
)]

use tauri::{
  CustomMenuItem, Manager, Menu, MenuItem, Submenu, SystemTray, SystemTrayEvent, SystemTrayMenu,
  SystemTrayMenuItem,
};

#[tauri::command]
fn my_custom_command() {
  println!("I was invoked from JS!");
}

// fn main() {
//   tauri::Builder::default()
//     .plugin(TauriSql::default())
//     .invoke_handler(tauri::generate_handler![my_custom_command])
//     .run(tauri::generate_context!())
//     .expect("error while running tauri application");
// }

fn main() {
  let quit = CustomMenuItem::new("quit".to_string(), "Quit");
  let hide = CustomMenuItem::new("hide".to_string(), "Hide");
  let show = CustomMenuItem::new("show".to_string(), "Show");
  let tray_menu = SystemTrayMenu::new()
    .add_item(show)
    .add_item(hide)
    .add_native_item(SystemTrayMenuItem::Separator)
    .add_item(quit);
  let tray = SystemTray::new().with_menu(tray_menu);

  let submenu = Submenu::new(
    "File",
    Menu::new()
      .add_native_item(MenuItem::Hide)
      .add_native_item(MenuItem::Quit),
  );
  let menu = Menu::new().add_submenu(submenu);

  #[cfg(not(target_os = "macos"))]
  let builder = tauri::Builder::default();
  #[cfg(target_os = "macos")]
  let builder = tauri::Builder::default().menu(menu);

  builder
    .system_tray(tray)
    .on_system_tray_event(|app, event| match event {
      SystemTrayEvent::MenuItemClick { id, .. } => match id.as_str() {
        "show" => {
          let window = app.get_window("main").unwrap();
          window.show().unwrap();
          window.set_focus().unwrap();
        }
        "hide" => {
          let window = app.get_window("main").unwrap();
          window.hide().unwrap();
        }
        "quit" => {
          app.exit(0);
        }
        _ => {}
      },
      _ => {}
    })
    // This is where you pass in your commands
    .invoke_handler(tauri::generate_handler![my_custom_command])
    .run(tauri::generate_context!())
    .expect("error while running tauri application");

}
