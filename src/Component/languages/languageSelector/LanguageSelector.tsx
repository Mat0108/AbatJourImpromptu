import { useContext, useState } from "react";
import Flag from "react-world-flags";
import { LanguageContext, languageOptions, Language } from "..";

const LanguageSelector = () => {
  const [showOptions, setShowOptions] = useState(false);
  const [isButtonHovering, setIsButtonHovered] = useState(false);
  const [isMenuHovering, setIsMenuHovered] = useState(false);
  const { userLanguage, userLanguageChange } = useContext(LanguageContext);

  const isMobile = window.screen.width < 600;
  const handleClick = (e:any) => {
     e.stopPropagation();
    setShowOptions(!showOptions);
  };

  const changeLanguage = (lang: Language) => {
    userLanguageChange(lang);
  };

  const onMouseEnterButton = () => {
    setShowOptions(true);
    setIsButtonHovered(true);
  };

  const onMouseEnterMenu = () => {
    setShowOptions(true);
    setIsMenuHovered(true);
  };

  const onMouseLeaveButton = () => {
    setIsButtonHovered(false);
    if (!isMenuHovering) setShowOptions(false);
  };

  const onMouseLeaveMenu = () => {
    setIsMenuHovered(false);
    if (!isButtonHovering) setShowOptions(false);
  };

  const getCountryFlag = (lang: Language | string) => {
    const FlagDictonary: Record<string, string> = {
      en: "gb",
      hi: "in",
      zh: "cn",
      sv: "se",
      uk: "ua",
      el: "gr",
      kk: "kz",
    };
    return FlagDictonary[lang] || lang;
  };

  return (
    <div className="relative h-full flex center">

      <button
        type="button"
        onClick={handleClick}
        onMouseEnter={onMouseEnterButton}
        onMouseLeave={onMouseLeaveButton}
        className={`${isMobile ? 'px-1':'p-4'}  text-[8px] sm:text-[16px] font-mt ${
          !isMobile && ( showOptions 
            ? "bg-red text-white "
            : "")
        }`}
        id="menu-button"
        aria-expanded="true"
        aria-haspopup="true"
      >
        <div className={`flex ${isMobile ? 'gap-1':'gap-x-2.5'}`}>
          <Flag
            code={getCountryFlag(userLanguage)}
            alt="Language"
            width={window.screen.width < 600 ? 16 : 32}
            height={window.screen.width < 600 ? 16 : 32}
          />
          <div className="title-header uppercase">{userLanguage}</div>
        </div>
      </button>

      {showOptions && (
        <div
          onMouseEnter={onMouseEnterMenu}
          onMouseLeave={onMouseLeaveMenu}
          className={`absolute top-full left-0  bg-white  text-gray-normal z-[1000] ${isMobile ? 'p-0.5 rounded-lg':'p-2 rounded-xl'} drop-shadow-2xl h-fit w-max overflow-auto`}
          style={{
            fontFamily: "AvenirNextCyr",
            boxShadow: "20px 20px 20px black",
          }}
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="menu-button"
          tabIndex={-1}
        >
          <div className={`${isMobile ? 'py-0.5':'py-1'} space-y-[5%] `} role="none">
            {Object.entries(languageOptions).map(([id, name], key) => {
              return (
                <div
                  key={key}
                  className={`z-30 flex gap-1 center ${isMobile ? 'p-1 text-3xs hover:rounded-base' : 'p-2 text-base hover:rounded-lg'}  ${userLanguage === id ? 'bg-red rounded-lg text-white ':'bg-white'} hover:bg-darkedRed hover:text-white    `}
                  onClick={(e) =>{ e.stopPropagation(); changeLanguage(id as Language); setShowOptions(false);}}
                  >
                    <div><Flag code={getCountryFlag(id)} alt="Language"  width={window.screen.width < 600 ? 16 : 32} height={window.screen.width < 600 ? 16 : 32}/></div>
                    <div className="">{id.toUpperCase()}</div>
                    </div>
              );
            })}
          </div>
        </div>
      )}
    </div>
  );
};

export default LanguageSelector;
