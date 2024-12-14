import React from 'react';

export function ConsentText() {
  return (
    <div className="text-white space-y-4">
      <h2 className="text-2xl text-center mb-6">必ず お読みください</h2>
      <div className="space-y-3 text-sm leading-relaxed">
        <p>● これは公式に音環を紹介するものではなく、1年生を中心に実施した大学生活アンケート や インターネット上の情報をもとに開発した 「AI猫」と対話できる エンタメ企画です。</p>
        <p>● 音環生の生態や音環の実態について お答えします。</p> 
        <p>● AIに翻弄される昨今の世の中に対する風刺であり、あなたのメディア・リテラシーへの挑戦（なのかもしれない）です。</p>
      <p>● お一人様につき 10回まで受け答えをします。</p>
        <p>　 </p> 
        <p>● 彼らは 平気で嘘をつきます。正確な情報は、近くにいる音環生に尋ねましょう。</p>
        <p>● プレイ画面の録音 及び 撮影は禁止です。会話ログを遡ることもできませんので、目に焼き付けてください。 </p> 
        <p>● 千住 ArtPath2024 の会場案内はしません。お近くのスタッフにお声かけください。</p>
        <p>● 入試に関する情報は 提供しません。</p>
        <p>● 出力される情報は、学生個人の感想やインターネット上の情報に基づき、AIが学習・変形したものです。音環の公式情報ではありません。</p>

      </div>
      <p className="mt-8 text-sm text-center text-white/80">
        Enterキー を押して開始
      </p>
    </div>
  );
}