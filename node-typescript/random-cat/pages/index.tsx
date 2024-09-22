import { GetServerSideProps, NextPage } from "next";
import { useState } from "react";
import styles from "./index.module.css";

type Props = {
    initialImageUrl: string;
};

const IndexPage: NextPage<Props> = ({ initialImageUrl }) => {
    // useStateの初期値をImage型にする
    const [imageUrl, setImageUrl] = useState(initialImageUrl); //初期値url
    const [loading, setLoading] = useState(false); //初期状態をfalseにする

    // ボタンをクリックしたときに画像を取得
    const handleClick = async () => {
        setLoading(true); // ローディング中にする
        const newImage = await fetchImage();
        setImageUrl(newImage.url); // 画像をセット
        setLoading(false); // ローディング中でなくする
    }
    // ローディング中でなければ画像を表示
    return (
        <div className={styles.page}>
            <button onClick={handleClick} className={styles.button}>
                New Cat
            </button>
            <div className={styles.frame}>
                {loading || <img src={imageUrl} className={styles.img} />}</div>
        </div>
    );
};
export default IndexPage;

// サーバーサイドで画像を取得
export const getServerSideProps: GetServerSideProps<Props> = async () => {
    const image = await fetchImage();
    return {
        props: {
            initialImageUrl: image.url,
        },
    };
};

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