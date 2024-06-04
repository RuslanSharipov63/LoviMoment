import styles from "./../ui/About.module.css";
import { Nunito } from "next/font/google";
import Image from "next/image";
const dancingScript = Nunito({ subsets: ["cyrillic"] });

const About = () => {
  return (
    <div className={styles.container}>
      <div className={styles.textContainer}>
        <p className={`${dancingScript.className} ${styles.textTitle}`}>
          О проекте
        </p>
        <p className={`${dancingScript.className} ${styles.textDescription}`}>
        Бесплатный фотосток
        </p>
        <p className={`${dancingScript.className} ${styles.text}`}>
          "ЛОВИ МОМЕНТ" - это мой пет-проект, начинающего программиста. Фотосток
          абсолютно бесплатный. Фотографии размещенные здесь можете использовать
          везде, где вы только захотите, в том числе и в коммерческих проектах.
          Одна только просьба, и это всего лишь просьба, если фото возьмете с
          моего ресурса, сделайте на него где-нибудь ссылку.
        </p>
      </div>

      <div className={styles.smallContainer}>
        <div className={styles.ultimateImg}>
          <Image
            width={500}
            height={500}
            src={"/photograf.jpg"}
            alt="фото страница о проекте"
            style={{
              width: "100%",
              height: "auto",
              borderRadius: "10px",
            }}
          />
        </div>
      </div>
    </div>
  );
};

export default About;
