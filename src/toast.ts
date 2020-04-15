export function toast(message: string, duration = 2000) {
  const toast = document.createElement('ion-toast');
  toast.setAttribute("id", "toast");
  toast.message = message;
  toast.duration = duration;
  toast.color = "danger"
  document.body.appendChild(toast);
  // document.getElementById("toast").style.backgroundColor = "lightblue";
  return toast.present();
}