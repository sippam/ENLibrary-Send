import React from "react";;
import Img1 from "../../public/assets/md-thai-emblem_300x300.svg";
import Img2 from "../../public/assets/AGKKU.svg";
import Img3 from "../../public/assets/AMSKKU.svg";
import Img4 from "../../public/assets/ARCH_KKU_Logo.svg";
import Img5 from "../../public/assets/DENTISTRY_KKU.svg";
import Img6 from "../../public/assets/EDU_KKU_Symbo.svg";
import Img7 from "../../public/assets/Nursing_KKU_Thai_Symbol.svg";
import Img8 from "../../public/assets/Pharmaceutical_Science_KKU.svg";
import Img9 from "../../public/assets/Public_Heaalth_KKU.svg";
import Img10 from "../../public/assets/VET_KKU_LOGO.svg";
import Img12 from "../../public/assets/COLA_KKU_Symbol.svg";
import Img13 from "../../public/assets/FIS_KKU_Symbol.svg";
import LibrabyImg from "./LibrabyImg";
const Mapping = () => {
  return (
    <div
      id="map"
      className="w-full md:h-screen  flex items-center py-44 p-2 text-center dark:bg-[#282a36] "
    >
      <div className="max-w-[1240px] m-auto md-grid grid-cols-3 gap-8">
        <div className="col-span-2">
          <h2 className="uppercase dark:text-[white]">
            Mapping to other <span className="text-[red]">Library </span>{" "}
          </h2>
          <p className=" uppercase text-lg mt-4 hidden md:hidden">
            Let&apos;s Check it Out
          </p>
        </div>
        <div className="circlehover z-1">
          <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-6 p-7">
            <a
              href="https://www.google.com/maps?ll=16.469542,102.830309&z=16&t=m&hl=th&gl=TH&mapclient=embed&cid=3251952549610997991"
              target="_blank"
            >
              <LibrabyImg socialImg={Img1} />
            </a>
            <a
              href="https://www.google.com/maps/place/%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%94+%E0%B8%84%E0%B8%93%E0%B8%B0%E0%B9%80%E0%B8%81%E0%B8%A9%E0%B8%95%E0%B8%A3%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C+%E0%B8%A1%E0%B8%AB%E0%B8%B2%E0%B8%A7%E0%B8%B4%E0%B8%97%E0%B8%A2%E0%B8%B2%E0%B8%A5%E0%B8%B1%E0%B8%A2%E0%B8%82%E0%B8%AD%E0%B8%99%E0%B9%81%E0%B8%81%E0%B9%88%E0%B8%99/@16.4767097,102.8219102,15z/data=!4m14!1m7!3m6!1s0x31228a8e64e065a5:0xb613c7ef92c46936!2z4Lir4LmJ4Lit4LiH4Liq4Lih4Li44LiUIOC4hOC4k-C4sOC5gOC4geC4qeC4leC4o-C4qOC4suC4quC4leC4o-C5jCDguKHguKvguLLguKfguLTguJfguKLguLLguKXguLHguKLguILguK3guJnguYHguIHguYjguJk!8m2!3d16.4767097!4d102.8219102!16s%2Fg%2F12295xkh!3m5!1s0x31228a8e64e065a5:0xb613c7ef92c46936!8m2!3d16.4767097!4d102.8219102!16s%2Fg%2F12295xkh"
              target="_blank"
            >
              <LibrabyImg socialImg={Img2} />
            </a>
            <a
              href="https://www.facebook.com/amslibkku/?locale=th_TH"
              target="_blank"
            >
              <LibrabyImg socialImg={Img3} />
            </a>
            <a
              href="https://www.google.com/maps/place/%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%94%E0%B8%84%E0%B8%93%E0%B8%B0%E0%B8%AA%E0%B8%96%E0%B8%B2%E0%B8%9B%E0%B8%B1%E0%B8%95%E0%B8%81%E0%B8%A3%E0%B8%A3%E0%B8%A1%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C/@16.4718153,102.8218327,16z/data=!4m7!3m6!1s0x31228b3a9e53c81b:0x459dcdaa7bdc795e!8m2!3d16.4724442!4d102.8269119!15sClvguKfguLTguJfguKLguLLguKXguLHguKLguJvguIHguITguKPguK3guIfguJfguYnguK3guIfguJbguLTguYjguJkg4Lir4LmJ4Lit4LiH4Liq4Lih4Li44LiUkgESdW5pdmVyc2l0eV9saWJyYXJ54AEA!16s%2Fg%2F11g1ktbzdw?hl=th&coh=164777&entry=tt&shorturl=1"
              target="_blank"
            >
              <LibrabyImg socialImg={Img4} />
            </a>
            <a
              href="https://www.facebook.com/kkudtlibrary/?locale=th_TH"
              target="_blank"
            >
              <LibrabyImg socialImg={Img5} />
            </a>
            <a
              href="https://www.facebook.com/profile.php?id=100064453671998&paipv=0&eav=AfbFFv7qKCkP8YyIq5c7NUtx2DWRyUubefI-3K3sOl18xkIpZS5FYnzyNw0qDIhp0l0"
              target="_blank"
            >
              <LibrabyImg socialImg={Img6} />
            </a>
            <a
              href="https://www.google.com/maps/place/Faculty+of+Nursing,+Khon+Kaen+University/@16.469719,102.825133,17z/data=!4m6!3m5!1s0x31228a8a4e16e32b:0x502b8d824e68e4e4!8m2!3d16.4697188!4d102.8251325!16s%2Fg%2F122lq4vg?hl=en-GB"
              target="_blank"
            >
              <LibrabyImg socialImg={Img7} />
            </a>
            <a
              href="    https://pharm.kku.ac.th/psthai/index.php/site/internal_department      "
              target="_blank"
            >
              <LibrabyImg socialImg={Img8} />
            </a>
            <a
              href="https://www.google.com/maps/place/%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%94%E0%B8%84%E0%B8%93%E0%B8%B0%E0%B8%AA%E0%B8%B2%E0%B8%98%E0%B8%B2%E0%B8%A3%E0%B8%93%E0%B8%AA%E0%B8%B8%E0%B8%82%E0%B8%A8%E0%B8%B2%E0%B8%AA%E0%B8%95%E0%B8%A3%E0%B9%8C+%E0%B8%A1%E0%B8%82/@16.4713646,102.8249667,16.08z/data=!4m7!3m6!1s0x31228a8b005a9a5f:0xa6ed263f4d032c29!8m2!3d16.4703431!4d102.8257341!15sClvguKfguLTguJfguKLguLLguKXguLHguKLguJvguIHguITguKPguK3guIfguJfguYnguK3guIfguJbguLTguYjguJkg4Lir4LmJ4Lit4LiH4Liq4Lih4Li44LiUkgEHbGlicmFyeeABAA!16s%2Fg%2F11dxftxrrq?hl=th&coh=164777&entry=tt&shorturl=1"
              target="_blank"
            >
              <LibrabyImg socialImg={Img9} />
            </a>
            <a
              href="https://www.google.com/maps/search/%E0%B8%84%E0%B8%93%E0%B8%B0%E0%B8%AA%E0%B8%B1%E0%B8%95%E0%B8%A7%E0%B9%81%E0%B8%9E%E0%B8%97%E0%B8%A2%E0%B9%8C++%E0%B8%A1%E0%B8%82/@16.479302,102.831346,15z?hl=en-GB"
              target="_blank"
            >
              <LibrabyImg socialImg={Img10} />
            </a>
            {/* <a
              href="https://www.google.com/maps/place/%E0%B8%AB%E0%B9%89%E0%B8%AD%E0%B8%87%E0%B8%AA%E0%B8%A1%E0%B8%B8%E0%B8%94%E0%B8%84%E0%B8%93%E0%B8%B0%E0%B8%9A%E0%B8%A3%E0%B8%B4%E0%B8%AB%E0%B8%B2%E0%B8%A3%E0%B8%98%E0%B8%B8%E0%B8%A3%E0%B8%81%E0%B8%B4%E0%B8%88%E0%B9%81%E0%B8%A5%E0%B8%B0%E0%B8%81%E0%B8%B2%E0%B8%A3%E0%B8%9A%E0%B8%B1%E0%B8%8D%E0%B8%8A%E0%B8%B5/@16.4738774,102.8257522,19.71z/data=!4m14!1m7!3m6!1s0x31228a8c8f6b309d:0x9d15e9ff34ebaa36!2z4Lin4Li04LiX4Lii4Liy4Lil4Lix4Lii4Lia4Lix4LiT4LiR4Li04LiV4Lio4Li24LiB4Lip4Liy4LiB4Liy4Lij4LiI4Lix4LiU4LiB4Liy4LijIChNQkEpIOC4oeC4q-C4suC4p-C4tOC4l-C4ouC4suC4peC4seC4ouC4guC4reC4meC5geC4geC5iOC4mQ!8m2!3d16.473878!4d102.826066!16s%2Fg%2F12hq_pv0p!3m5!1s0x31228b856d7aa5f3:0x3b254c79988c71b1!8m2!3d16.4740771!4d102.8253378!16s%2Fg%2F11pzy8h3yv "
              target="_blank"
            >
              <LibrabyImg socialImg={Img11} />
            </a> */}
            <a href="https://www.cola.kku.ac.th/cola/web/" target="_blank">
              <LibrabyImg socialImg={Img12} />
            </a>
            <a
              href="https://www.facebook.com/Library.NKC/?locale=th_TH"
              target="_blank"
            >
              <LibrabyImg socialImg={Img13} className="" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Mapping;
