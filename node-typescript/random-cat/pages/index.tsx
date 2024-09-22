import { NextPage } from "next";
import { useEffect, useState } from "react";

const IndexPage: NextPage = () => {
    // useStateの初期値をImage型にする
    const [imageUrl, setImageUrl] = useState("");
    const [loading, setLoading] = useState(true);
    // mount時に画像を取得
    useEffect(() => {
        fetchImage().then((newImage) => {
            setImageUrl(newImage.url);
            setLoading(false);
      });
    }, []);
    // ボタンをクリックしたときに画像を取得
    const handleClick = async () => {
        setLoading(true); // ローディング中にする
        const newImage = await fetchImage();
        setImageUrl(newImage.url); // 画像をセット
        setLoading(false); // ローディング中でなくする
    }
    // ローディング中でなければ画像を表示
    return (
        <div>
            <button onClick={handleClick}>New Cat</button>
            <div>{loading || <img src={imageUrl} />}</div>
        </div>
    );
};
export default IndexPage;

type Image = {
    url: string;
};

const fetchImage = async (): Promise<Image> => {
    const res = await fetch("https://api.thecatapi.com/v1/images/search");
    const images = await res.json();
    // 配列として表現されているか
    if (!Array.isArray(images)){
        throw new Error("猫画像を取得できませんでした");
    }
    // 配列の最初の要素を取得
    const image: unknown = images[0];
    // Imageの構造をしているか
    if(!isImage(image)) {
        throw new Error("猫画像を取得できませんでした");
    }
    console.log(image);
    return image;
};

// Image型チェック関数
const isImage = (value: unknown): value is Image => {
    // valueがオブジェクトかどうか
    if (typeof value !== "object" || !value) {
        return false;
    }
    // urlプロパティが存在し、かつ、それが文字列か
    return "url" in value && typeof value.url === "string";
}

fetchImage();