import tailwindcss from '@tailwindcss/vite'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    rollupOptions: {
      input: {
        index: "index.html",
        hello_world: "hello-world.html",
        contact: "contact.html",
        task: "task.html",
        counter: "counter.html",
        note: "note.html",
        profile: "profile.html",
        timer: "timer.hrml",
        guestbook: "guestbook.html",
        product: "product.html",
        online: "online.html"
      }
    }
  }
})
