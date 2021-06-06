const baseExcludeTexts = ['o', 'O', '0', 'I', 'l', '1'];
document.getElementById('excludeTexts').value = baseExcludeTexts.join(',');                    //joinは()の中の文字で区切って、配列を文字列に変換する関数


const inputs = document.forms.inputs,                                                          //formの中のinputの値を取得するために定義　getElementByIdでも可
      passwordListElement = document.getElementById('passwordList');                           //passwordListElementの定数の定義。HTMLのidがpasswordListから値を取得

document.getElementById('generateButton').addEventListener('click', e => {                     //id[generateButton]がクリックされたときの処理を以下に記載
    e.preventDefault();                                                                        //ボタンを押しても更新をしないようにする

    const isIncludeNumber           = inputs.includeNumber.checked,                            //数字にチェックが入っているかどうかを確認するための定数
          isIncludeEnglishLowerCase = inputs.includeEnglishLowerCase.checked,                  //英小文字にチェックが入っているかどうかを確認するための定数
          isIncludeEnglishUpperCase = inputs.includeEnglishUpperCase.checked,                  //英大文字にチェックが入っているかどうかを確認するための定数
          isIncludeSymbol           = inputs.includeSymbol.checked,                            //記号にチェックが入っているかどうかを確認するための定数
          isIncludeNotUseItTwice    = inputs.notUseItTwice.checked;                             //8文字以内の場合同じ文字を2回使わないにチェックが入っているかどうかの確認

    if(isIncludeNumber || isIncludeEnglishLowerCase || isIncludeEnglishUpperCase || isIncludeSymbol) {            //どれかにチェックされているときの処理


    const passwordTexts = [];                                                                  //パスワード生成に使用する文字や数字の為の定数passwordTextsを空の配列で定義
    if (isIncludeEnglishLowerCase)  {                                                          //英小文字のチェックボックスにチェックがついていたら                                                       
        for (let i = 0; i < 26; i++) {                                                         //アルファベットの配列を作り出すための繰り返しのfor文
            passwordTexts.push(String.fromCharCode('a'.charCodeAt(0) + i));
        }         
    }
    if (isIncludeEnglishUpperCase)  {                 
        for (let i = 0; i < 26; i++) {                                                                
            passwordTexts.push(String.fromCharCode('A'.charCodeAt(0) + i)); 
        }
    }
    if (isIncludeNumber)  { 
        for (let i = 0; i < 10; i++) {                                                                
            passwordTexts.push(i);
        }
    }
    if (isIncludeSymbol) {
            passwordTexts.push('/','*','-','+','.',',','!','#','$','%','&','(',')','~','|','_');
    }
    

    const excludeTexts = inputs.excludeTexts.value.split(','),                                 //joinの逆で（）の中の文字で区切って配列化する関数
          excludedPasswordTexts = passwordTexts.filter(text => !(excludeTexts.includes(String(text)))); //filter関数は特定の条件を与えて配列データの取得したい内容を()の中に書くことで、任意のデータを抽出して新しい配列を生成する。　!()で条件を反対にする。Stringで取り出した文字列と値を正確に扱えるように

    let passwordLength = inputs.stringLength.value,                                            //パスワードの長さを決める定数を定義
        isoutOfRange   = false;　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　　//カスタムの範囲外を設定するための定数を定義
    if (passwordLength === 'custom') {
        passwordLength = inputs.customLength.value;                                            //カスタムに入力した値で長さを決める場合
        if (passwordLength < 1 || passwordLength > 100) {
            alert('文字数は1～20の中で設定してください')
            isoutOfRange = true;
        }
    }
    




    let numberOfPasswords = inputs.numberOfPasswords.value;                                    //パスワードを生成する回数を決める変数を定義
    if(numberOfPasswords === 'custom') {
        numberOfPasswords = inputs.customNumberOfPasswordInput.value;
        if (numberOfPasswords < 1 || numberOfPasswords > 100) {
            alert('生成するパスワードの個数は1～100の中で設定してください')
            isoutOfRange = true;
        }
    }

        if(!isoutOfRange && isIncludeNotUseItTwice && passwordLength <= 8) {                                                                        
            passwordListElement.innerHTML = ''; 
            for (let i = 0; i < numberOfPasswords; i++) {
                let passwords = '';                                                                //空の変数passwordsを定義
                for (let i = 0; i < passwordLength; i++) {
                    word = ''
                    while (true) {
                        word = excludedPasswordTexts[Math.floor(Math.random() * excludedPasswordTexts.length)]
                        if (passwords.indexOf(word) == -1) {
                            passwords += word
                            break;
                        }
                    }
                }
                const li = document.createElement('li'),                                          //liの定数の定義　liという新しい要素を生み出している
                    input = document.createElement('input');                                           //inputの定数の定義　inputという新しい要素を生み出している
                input.value = passwords;                                                           //定数inputにpasswordsを代入
                li.appendChild(input);                                                             //liに子要素の定数inputを追加
                passwordListElement.appendChild(li);                                               //passwordListに子要素の定数liを追加
            }
        } else {
            passwordListElement.innerHTML = ''; 


            for (let i = 0; i < numberOfPasswords; i++) {
                let passwords = '';                                                                //空の変数passwordsを定義
                for (let i = 0; i < passwordLength; i++) {   
                    passwords +=　excludedPasswordTexts[Math.floor(Math.random() * excludedPasswordTexts.length)]
                }
            
        

            const li  = document.createElement('li'),                                          //liの定数の定義　liという新しい要素を生み出している
                input = document.createElement('input');                                       //inputの定数の定義　inputという新しい要素を生み出している
            input.value = passwords;                                                           //定数inputにpasswordsを代入
            li.appendChild(input);                                                             //liに子要素の定数inputを追加
            passwordListElement.appendChild(li);                                               //passwordListに子要素の定数liを追加  
            }
        }
    }
})