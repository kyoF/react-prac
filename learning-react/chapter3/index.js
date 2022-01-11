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

// 3.3.5 再帰
// 関数の中から自分自身を再帰的に呼び出すテクニック
const countdown = (value, fn) => {
    fn(value);
    return value > 0 ? countdown(value - 1, fn) : value;
}
countdown(10, value => console.log(value))
// 非同期処理を組み合わせることで、データが取得できたかを確認してループ処理が出来る
const countdown = (value, fn, delay = 1000) => {
    fn(value);
    return value > 0
        ? setTimeout(() => countdown(value - 1, fn, delay), delay)
        : value;
};
const log = vlaue => console.log(value);
countdown(10, log);
// 再帰は、データ構造の探索用途（サブフォルダからファイルを探索する・HTMLドキュメントからDOM要素を探索するetc）にも使われる
const dan = {
    type: "person",
    data: {
        gender: "male",
        info: {
            id: 22,
            fullname: {
                first: "Dan",
                last: "deacon"
            }
        }
    }
};
deepPick("type", dan);
deepPick("data.info.fullname.first", dan)
const deepPick = (fields, object = {}) => {
    const [first, ...remaining] = fields.split(".");
    return remaining.length
        ? deepPick(remaining.join("."), object[first])
        : object[first];
};

// 3.3.6 関数の合成
// 関数を順番に、もしくは平行に呼び出したり、いくつかの関数呼び出しを束ねたりすることで、アプリ全体を構築する過程を関数の合成と呼ぶ
const template = "hh:mm:ss tt";
const clockTime = template
                    .replace("hh", "03")
                    .replace("mm", "33")
                    .replace("ss", "33")
                    .replace("tt", "PM");
console.log(clockTime);
const both = compose(
    civilianHours,
    appendAMPM
);
both(new Date());
const compose = (...fns) => arg =>
    fns.reduce((coposed, f) => f(composed), arg);

// 3.3.7 アプリケーションの構築
// デジタル時計の実装
const oneSecond = () => 1000;
const getCurrentTime = () => new Date();
const clear = () => console.clear();
const log = message => console.log(message);
const serializeClockTime = date => ({
  hours: date.getHours(),
  minutes: date.getMinutes(),
  seconds: date.getSeconds()
});
const civilianHours = clockTime => ({
  ...clockTime,
  hours: clockTime.hours > 12 ? clockTime.hours - 12 : clockTime.hours
});
const appendAMPM = clockTime => ({
  ...clockTime,
  ampm: clockTime.hours >= 12 ? "PM" : "AM"
});
const display = target => time => target(time);
const formatClock = format => time =>
  format
    .replace("hh", time.hours)
    .replace("mm", time.minutes)
    .replace("ss", time.seconds)
    .replace("tt", time.ampm)
const prependZero = key => clockTime => ({
  ...clockTime,
  [key]: clockTime[key] < 10 ? "0" + clockTime[key] : "" + clockTime[key]
});
const compose = (...fns) => arg =>
  fns.reduce((composed, f) => f(composed), arg);
const convertToCivilianTime = clockTime =>
  compose(
    appendAMPM,
    civilianHours
  )(clockTime);
const doubleDigits = civilianTime =>
  compose(
    prependZero("hours"),
    prependZero("minutes"),
    prependZero("seconds")
  )(vibilianTime);
const startTicking = () =>
  setInterval(
    compose(
      clear,
      getCurrentTime,
      serializeClockTime,
      convertToCivilianTime,
      doubleDigits,
      formatClock("hh:mm:ss tt"),
      display(log)
    ),
    oneSecond()
  );
startTicking();