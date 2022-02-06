import React from 'react';
import github from '../../../Images/SocialLogo/github.png'
import facebook from '../../../Images/SocialLogo/facebook.png'
import instagram from '../../../Images/SocialLogo/instagram.png'
import linkedin from '../../../Images/SocialLogo/linkedin.png'
import telegram from '../../../Images/SocialLogo/telegram.png'

function SocialMedia(){
    return (
        <div className={"socialLogos"}>
            <a href="https://github.com/radzikoska123">
                <img src={github} alt="Github"/>
            </a>
            <a href="https://www.linkedin.com/in/jakub-radzik-726682174/">
                <img src={linkedin} alt="Linkedin"/>
            </a>
            <a href="https://t.me/TechnikStarosta">
                <img src={telegram} alt="Telegram"/>
            </a>
            <a href="https://www.facebook.com/jakub.radzik.12/">
                <img src={facebook} alt="Facebook"/>
            </a>
            <a href="https://www.instagram.com/radzikol/">
                <img src={instagram} alt="Instagram"/>
            </a>
        </div>
    )
}

export default SocialMedia;