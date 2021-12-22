// 第三章

// 3.3.3 データの変換
// 配列の中の要素の数だけreduceで呼び出したコールバック関数を実行し、単一の値を出力
// reduceは二つの引数を取り、一つ目はコールバック関数、二つ目はコールバック関数で使用する初期値
const ages = [21, 18, 42, 40, 64, 63, 34];
const maxAge = ages.reduce((max, age) => {
    console.log(`${age} > ${max} = ${age > max}`);
    if (age > max) {
        return age;
    } else {
        return max;
    }
}, 0);
console.log("maxAge", maxAge);
// 上記のmaxAgeを出力するメソッドを三項演算子で
const maxAge = ages.reduce((max, age) => (age > max ? age : max), 0);
// reduceRightはreduceと同じ働きをするが、配列を先頭からではなく、後ろからみる
const minAge = ages.reduceRight((min, age) => (age < min ? age : min), 300);
console.log("minAge", minAge);
// 配列をオブジェクトに変換する際にも使用することが出来る
const colors = [
    {
        id: "xekare",
        title: "red red",
        rating: 3
    },
    {
        id: "jbwsof",
        title: "big blue",
        rating: 2
    },
    {
        id: "prigbj",
        title: "grizzly grey",
        rating: 5
    },
    {
        id: "ryhbhsl",
        title: "banana",
        rating: 1
    },
]
const hashColors = colors.reduce((hash, { id, title, rating }) => {
    hash[id] = { title, rating };
    return hash
}, {});
console.log(hashColors);
// reduceを使って、配列の重複を消す
const list_colors = ["red", "red", "green", "blue", "green"];
const uniqueColors = list_colors.reduce(
    (unique_list, color) =>
        unique_list.indexOf(color) === -1 ? [...unique_list, color] : unique_list
, []);
console.log(uniqueColors);

// 3.3.4 高階関数
// 高階関数とは、他の関数を引数にとるか、戻り値として関数を返すか、それら両方を満たす関数
// 関数を引数に撮る場合
const invokeIf = (condition, fnTrue, fnFalse) =>
    condition ? fnTrue() : fnFalse();
const showWelcome = () => console.log("Welcome");
const showUnauthorized  = () => console.log("Unauthorized");
invokeIf(true, showWelcome, showUnauthorized);
invokeIf(false, showWelcome, showUnauthorized);
// 戻り値が関数の場合
// 非同期処理を実装する際に、その場で処理を実行する代わりに関数を返すことで、すべての情報がそろった時点で処理をすることが出来る
const userLogs = userName => message =>
    console.log(`${userName} -> ${message}`);
const log = userLogs("grandpa23");
log("attempted to load 20 fake members");
getFakeMembers(20).then(
    members => log(`successfully loaded ${members.length} members`)
).catch(
    error => log("encountered an error loading members")
);