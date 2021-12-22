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
