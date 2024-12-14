export function createSpeechRecognition() {
  const recognition = new (window as any).webkitSpeechRecognition();
  recognition.lang = 'ja-JP';
  recognition.continuous = false;
  recognition.interimResults = false;
  
  return recognition;
}