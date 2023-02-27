import React from 'react'
import ButtonComp from './ButtonComp'

function Story() {

    return (
        <div className="story-container">
            <div className="story-image-and-title">
                <div className="story-image">
                    <img src="https://t3.ftcdn.net/jpg/03/12/05/66/240_F_312056679_DVCd21Ot6qU91kphT0UAxtYwrLW46Uq9.jpg" alt="" />
                </div>
                <div className="story-title">
                    <h1>
                        Please help me beat lung cancer
                    </h1>
                    <h5>
                        I am a patient of lung cancer since a year. I am in need of financial support for my treatment
                    </h5>
                </div>
            </div>
            <div className="author-and-donation">
                <div className="author-name">
                    <span>Author : </span>
                    Harsha
                    <br />
                    <span>Date : </span>
                    21-02-2023

                </div>
                <div className="donate-btn">
                    <ButtonComp className="donate-btn" title={"Donate"} />
                </div>
                <div className="donation-count">
                    <span>Amount Donated : </span> 0
                    <br />
                    <span>Amount Needed : </span> 10000$
                </div>
            </div>
            <div className="full-details">
                Dear Friends and Supporters,
                <br/>
                I come to you today with a heavy heart to share my current battle with lung cancer. As you can imagine, it has been a difficult journey for me and my loved ones. Along with the emotional toll, it has also been a tremendous financial burden on us.
                <br/>
                Despite my best efforts, I have been unable to afford the necessary treatments and medical care to fight this disease. It breaks my heart to admit that without financial assistance, I may not have the chance to fight this battle.
                <br/>
                This is why I am reaching out to you today, in the hopes that you can help me in my fight against lung cancer. Any donation, no matter how big or small, will go a long way in helping me access the treatment I need to beat this disease.
                <br/>
                I know that times are tough for everyone, and it's not easy to ask for help. But I am hopeful that my friends and supporters will come through for me in my time of need. I promise that every penny raised will go directly towards my treatment and care.
                <br/>
                I cannot thank you enough for taking the time to read this and for considering a donation. Together, we can make a difference and give me the chance to beat this disease and continue living my life to the fullest.
                <br/>
                Thank you from the bottom of my heart.
            </div>

            <div className="comments">
                <h3>0 Comments</h3>
            </div>
        </div>
    )
}

export default Story