import React from 'react';
import { Redirect, useHistory } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import './SplashPage.css';
import backgroundTop from '../../static/SplashPage/splash-top-background.jpg';
import pixelPalLogoWhite from '../../static/SplashPage/pixel-pal-logo-white.png';
import { login } from '../../store/session';

function SplashPage() {
	const sessionUser = useSelector(state => state.session.user);

	const dispatch = useDispatch();
    const history = useHistory();

    const handleLoginClick = async (e) => {
        e.preventDefault();
        history.push("/login");
    }

	const handleDemoLogin1 = async (e) => {
		e.preventDefault();
		await dispatch(login('demo@aa.io', 'password'))
			.catch(
				async (res) => {
					const errData = await res.json();
					console.log(errData)
				}
			)
	};
	const handleDemoLogin2 = async (e) => {
		e.preventDefault();
		await dispatch(login('marnie@aa.io', 'password'))
			.catch(
				async (res) => {
					const errData = await res.json();
					console.log(errData)
				}
			)
	};

    function handleRyanLinkedIn() {
        window.open("https://www.linkedin.com/in/ryangoggin20/", "_blank");
    }

    function handleRyanGithub() {
        window.open("https://github.com/ryangoggin", "_blank");
    }

    function handleRyanPortfolio() {
        window.open("https://ryangoggin.github.io/", "_blank");
    }

    function handleAileenLinkedIn() {
        window.open("https://www.linkedin.com/in/aekimx/", "_blank");
    }

    function handleAileenGithub() {
        window.open("https://github.com/aekimx", "_blank");
    }

    function handleAileenPortfolio() {
        window.open("https://aekimx.github.io/", "_blank");
    }

    function handleZainebLinkedIn() {
        window.open("https://www.linkedin.com/in/zaineb-marediya/", "_blank");
    }

    function handleZainebGithub() {
        window.open("https://github.com/zmare", "_blank");
    }

    function handleZainebPortfolio() {
        window.open("https://zmare.github.io/", "_blank");
    }

    function handleKennyLinkedIn() {
        window.open("https://www.linkedin.com/in/kenny-leong97/", "_blank");
    }

    function handleKennyGithub() {
        window.open("https://github.com/kenny-leong", "_blank");
    }

    function handleKennyPortfolio() {
        window.open("https://kenny-leong.github.io/", "_blank");
    }

	if (sessionUser) return <Redirect to="/channels/@me" />;

	return (
		<>
			<div className="splash-container">
                <div className='splash-top'>
                    <img className='splash-top-background' src={backgroundTop} alt="splash top background" />
                    <div className='splash-top-nav'>
                        <div className='splash-top-nav-left'>
                            <img className='pixel-pal-logo-white' src={pixelPalLogoWhite} alt="pixel pal white logo" />
                            <h3 className='pixel-pal-logo-text'>PixelPal</h3>
                        </div>
                        <div className='splash-top-nav-center'>
                            <button className='demo-login-button' onClick={handleDemoLogin1}>
                                Demo User 1 Log In
                            </button>
                            <button className='demo-login-button' onClick={handleDemoLogin2}>
                                Demo User 2 Log In
                            </button>
                        </div>
                        <div className='splash-top-nav-right'>
                            <button className='splash-login-button' onClick={handleLoginClick}>
                                Log In
                            </button>
                        </div>
                    </div>
                    <div className='splash-top-center'>
                        <p className='imagine-text'>IMAGINE A PLACE...</p>
                        <p className='where-you-can-text'>
                            ...where you can belong to a school club, a gaming
                             group, or a worldwide art community. Where just you
                             and a handful of friends can spend time together.
                             A place that makes it easy to talk every day and hang
                             out more often.
                        </p>
                        <button className='splash-open-button' onClick={handleLoginClick}>
                                Open PixelPal in your browser
                        </button>
                    </div>
                </div>
                <div className="splash-middle">
                    <p className='meet-developers-text'>Meet the Developers</p>
                    <div className='devs-container'>
                        <button className="portfolio-button ryan-button" onClick={handleRyanPortfolio}>
                            <div className='dev-container ryan-container'>
                                <p className='dev-name-text ryan-text'>Ryan Goggin</p>
                                <div className='dev-social-media-container'>
                                    <button className='linkedin-button' onClick={handleRyanLinkedIn}>
                                        <i className="fa-brands fa-linkedin ryan-text"></i>
                                    </button>
                                    <button className='github-button' onClick={handleRyanGithub}>
                                        <i className="fa-brands fa-github ryan-text"></i>
                                    </button>
                                </div>
                            </div>
                        </button>
                        <button className="portfolio-button aileen-button" onClick={handleAileenPortfolio}>
                            <div className='dev-container aileen-container'>
                                <p className='dev-name-text aileen-text'>Aileen Kim</p>
                                <div className='dev-social-media-container'>
                                    <button className='linkedin-button' onClick={handleAileenLinkedIn}>
                                        <i className="fa-brands fa-linkedin aileen-text"></i>
                                    </button>
                                    <button className='github-button' onClick={handleAileenGithub}>
                                        <i className="fa-brands fa-github aileen-text"></i>
                                    </button>
                                </div>
                            </div>
                        </button>
                        <button className="portfolio-button zaineb-button" onClick={handleZainebPortfolio}>
                            <div className='dev-container zaineb-container'>
                                <p className='dev-name-text zaineb-text'>Zaineb Marediya</p>
                                <div className='dev-social-media-container'>
                                    <button className='linkedin-button' onClick={handleZainebLinkedIn}>
                                        <i className="fa-brands fa-linkedin zaineb-text"></i>
                                    </button>
                                    <button className='github-button' onClick={handleZainebGithub}>
                                        <i className="fa-brands fa-github zaineb-text"></i>
                                    </button>
                                </div>
                            </div>
                        </button>
                        <button className="portfolio-button kenny-button" onClick={handleKennyPortfolio}>
                            <div className='dev-container ken-container'>
                                <p className='dev-name-text kenny-text'>Kenny Leong</p>
                                <div className='dev-social-media-container'>
                                    <button className='linkedin-button' onClick={handleKennyLinkedIn}>
                                        <i className="fa-brands fa-linkedin kenny-text"></i>
                                    </button>
                                    <button className='github-button' onClick={handleKennyGithub}>
                                        <i className="fa-brands fa-github kenny-text"></i>
                                    </button>
                                </div>
                            </div>
                        </button>
                    </div>
                </div>
                <div className='splash-bottom'>
                    <div className='tech-stack-container'>
                        <p className='tech-stack-text'>IMAGINE A TECH STACK</p>
                        <div className='technologies'>
                            <ul className='tech-list'>
                                <li className='tech-type'>Frontend</li>
                                <li className='tech-item'>JavaScript</li>
                                <li className='tech-item'>React</li>
                                <li className='tech-item'>Redux</li>
                                <li className='tech-item'>HTML5</li>
                                <li className='tech-item'>CSS3</li>
                            </ul>
                            <ul className='tech-list'>
                                <li className='tech-type'>Backend</li>
                                <li className='tech-item'>Python</li>
                                <li className='tech-item'>Flask</li>
                                <li className='tech-item'>SQLAlchemy</li>
                                <li className='tech-item'>PostgreSQL</li>
                                <li className='tech-item'>Socket.io</li>
                            </ul>
                            <ul className='tech-list'>
                                <li className='tech-type'>Deployment</li>
                                <li className='tech-item'>Render</li>
                            </ul>
                        </div>
                    </div>
                </div>
			</div>
		</>
	);
}

export default SplashPage;
