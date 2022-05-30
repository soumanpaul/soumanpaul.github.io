import React from 'react'
import Typewriter from 'typewriter-effect';
import Switch from 'react-switch';

export default function Header({ sharedData }) {
	const [checked, setChecked] = React.useState(false)
	const [data, setTitle] = React.useState([])


	React.useEffect(() => {
		if (sharedData.basic_info)
			setTitle(sharedData.basic_info)
	}, [sharedData])

	const onThemeSwitchChange = (checked) => {
		setChecked(checked);
		setTheme();
	}

	const setTheme = () => {
		var dataThemeAttribute = "data-theme";
		var body = document.body;
		var newTheme =
			body.getAttribute(dataThemeAttribute) === "dark" ? "light" : "dark";
		body.setAttribute(dataThemeAttribute, newTheme);
	}

	const HeaderTitleTypeAnimation = React.memo(() => {
		return <Typewriter className="title-styles" options={{ strings: data.titles, autoStart: true, loop: true }} />
	}, (props, prevProp) => true);

	return (
		<header id="intro" className='' style={{ display: 'block', width: "85%", float: "right" }}>
			<div className="row">
				<div className="">
					<div className='them-position'>
						<Switch
							checked={checked}
							onChange={onThemeSwitchChange}
							offColor="#baaa80"
							onColor="#353535"
							className="react-switch mx-auto"
							width={90}
							height={40}
							uncheckedIcon={
								<span
									className="iconify"
									data-icon="twemoji:owl"
									data-inline="false"
									style={{
										display: "block",
										height: "100%",
										fontSize: 25,
										textAlign: "end",
										marginLeft: "20px",
										color: "#353239",
									}}
								></span>
							}
							checkedIcon={
								<span
									className="iconify"
									data-icon="noto-v1:sun-with-face"
									data-inline="false"
									style={{
										display: "block",
										height: "100%",
										fontSize: 25,
										textAlign: "end",
										marginLeft: "10px",
										color: "#353239",
									}}
								></span>
							}
							id="icon-switch"
						/>
					</div>

				</div>
				<div className="col-md-12">
					<section id="intro" className="section scrollspy full-height ">
						<div className="overlay"></div>
						<div className="container row pt-5  justify-content-center">
							<div className="col-md-9  ">
								<div className="">
									<p className='tittel'>Hi, I'm <span className="teal">Souman Paul</span></p>
									<p className=' description typetext'>A<HeaderTitleTypeAnimation /></p>
									<p className='description'>Self-driven, quick starter, passionate programmer with a curious mind who enjoys solving a complex and challenging real-world problems.</p>
								</div>
								<div className="social">
									<a href="http://linkedin.com/in/souman" target="_blank">
										<button className="icon-btn linkedin">
											<i className="fab fa-linkedin"></i>
										</button>
									</a>
									<a href="https://github.com/soumanpaul/" target="_blank">
										<button className="icon-btn github">
											<i className="fab fa-github"></i>
										</button>
									</a>
								</div>
								<div className='buttons'>
									<a href="#about" className="readme">Read More</a>
									<a href="#contact" className="contactme">Contact Me</a>
								</div>
							</div>
						</div>
					</section>
				</div>
			</div>
		</header>
	)
}
