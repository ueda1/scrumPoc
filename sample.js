// node-postgresモジュールを読み込む
const { Client } = require('pg')

// 引数チェック
for(var i = 0;i < process.argv.length; i++){
    console.log("argv[" + i + "] = " + process.argv[i]);
  }

// 退出日までの猶予期間
$1 = process.argv[2];

// postgreSQLの接続設定を確認し、オブジェクトに設定
const client = new Client({
    user: 'postgres',
    host: 'localhost',
    database: 'postgres',
    password: 'easy',
    port: 5434,
    // user: 'ユーザー名',
    // host: 'ホスト',
    // database: 'データベース名',
    // password: 'パスワード',
    // port: ポート,
})

// DBに接続
client.connect()

// クエリ作成
const query = {
    // TODO：日付取得はDBとjsのどっちで取る？
    // TODO：タイムゾーンはUTC？ JST？
    name: '社員情報取得',
    text: 'select project_end_date from t_employee_datas where project_end_date - ' + $1 + '<= current_date',
    // text: 'select * from t_employee_datas',
    // values: [引数(引数なしの場合は省略可)],
    // name: 'クエリ名(任意かつ省略可)',
    // text: 'SQL文を記載(引数は'$'の後に何番目の引数かを指定。例:第1引数の場合は$1)',
    // values: [引数(引数なしの場合は省略可)],
}

// クエリを実行し結果を取得
client.query(query)
    .then(res => {
        // console.log(res.rows[0])
        for (i = 0 ; i < res.rowCount; i++) {
            console.log(res.rows[i])
        }
        client.end()
    })
    .catch(e => console.error(e.stack))
