export const messages = {
  errors: {
    sendFailed: 'メッセージの送信に失敗しました',
    noResponse: '応答を受信できませんでした',
    videoNotSupported: 'お使いのブラウザは動画の再生に対応していません',
    speechRecognitionNotSupported: 'お使いのブラウザは音声認識に対応していません',
    emptyMessage: 'メッセージを入力してください',
    streamProcessing: 'ストリームの処理中にエラーが発生しました',
    invalidStreamData: '無効なストリームデータを受信しました',
  },
  placeholders: {
    messageInput: 'メッセージを入力...',
    voiceInput: '音声入力中...',
  },
  loading: {
    sending: '送信中...',
    thinking: '考え中...',
  },
  buttons: {
    send: '送信',
    startVoice: '音声入力を開始',
    stopVoice: '音声入力を停止',
  },
  accessibility: {
    userAvatar: 'ユーザーアバター',
    messageInput: 'メッセージ入力欄',
    sendButton: '送信ボタン',
  },
} as const;

export const INITIAL_GREETING = 'やあ、こんにちは！そうたろうは今年の４月から北千住にやってきて、音環を見守っている猫だニャ～^^ みんなからは“そうたろう”と呼ばれているのニャ～^^ 音環の学生生活などについて気になることがあったら、そうたろうにきいてニャ～^^ ';

export const LAST_GREETING = 'おっと、そろそろ時間みたいだニャ～^^ 今日はありがとうニャ～^^';