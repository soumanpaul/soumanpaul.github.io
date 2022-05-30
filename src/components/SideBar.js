import React from 'react'
import '../Style.css'
export default function SideBar() {
	return (
		<div>
			<nav className="">
				<ul className="side-nav fixed section table-of-contents">

					<li className="logo ">
						<a id="logo-container" aria-label="Navigate  beginning of the page" href="#intro"
							className="brand-logo grey-blue-text">
							<img src="images/me.jpg" className="circle img-responsive profile-pic" alt="avatar" />
						</a>
					</li>

					<li className="bold sidebar-size">
						<a aria-label="Navigate sidebar-size  About section" href="#about" className="waves-effect waves-dark teal-text"><i
							className="mdi-social-person small"></i><span>About</span></a>
					</li>
					<li className="bold">

						<a aria-label="Navigate  Skills section" href="#skills" className="waves-effect waves-dark teal-text"><i
							className="mdi-action-assessment small"></i><span>Skills</span></a>
					</li>
					<li className="bold">
						<a aria-label="Navigate  Experience section" href="#resume"
							className="waves-effect waves-dark teal-text"><i
								className="mdi-action-trending-up small"></i><span>Experience</span></a>
					</li>

					<li className="bold">
						<a aria-label="Navigate  Projects section" href="#portfolio" className="waves-effect waves-dark teal-text"><i
							className="mdi-av-my-library-books small"></i><span>Projects</span></a>
					</li>

					<li className="bold">
						<a aria-label="Navigate  Education section" href="#education" className="waves-effect waves-dark teal-text"><i
							className="mdi-social-school small"></i><span>Education</span></a>
					</li>

					<li className="bold">
						<a aria-label="Navigate  Contact section" href="#contact" className="waves-effect waves-dark teal-text"><i
							className="mdi-content-mail small"></i><span>Contact</span></a>
					</li>

					<li className="bold">
						<a aria-label="Open Varad's resume in a new tab" href="https://soumanpaul.github.io/resume.pdf" target="_blank"
							className="waves-effect waves-dark teal-text"><i className="mdi-file-folder-open small"></i><span>Resume</span></a>
					</li>
				</ul>
			</nav>



			{/* for small screen */}
			<nav className="hide-on-large only trigger z-depth-1">
				<a aria-label="Toggle visibility of the mobile navbar" href="#" data-activates="slide-out"
					className="button-collapse"><i className="mdi-navigation-menu"></i></a>
				<div className="name-title">
					<a id="name" aria-label="Navigate  beginning of the page" href="#" className="teal-text">Souman Paul</a><span className="black-text">Software Developer</span>
				</div>
			</nav>

			<nav className="hide-on-large only">
				<ul id="slide-out" className="side-nav">
					<li className="bold">
						<a aria-label="Navigate  About section" href="#about" className="waves-effect waves-dark teal-text"><i
							className="mdi-social-person small"></i><span>About</span></a>
					</li>
					<li className="bold">
						<a aria-label="Navigate  Experience section" href="#experience"
							className="waves-effect waves-dark teal-text"><i
								className="mdi-action-trending-up small"></i><span>Experience</span></a>
					</li>
					<li className="bold">
						<a aria-label="Navigate  Projects section" href="#projects" className="waves-effect waves-dark teal-text"><i
							className="mdi-av-my-library-books small"></i><span>Projects</span></a>
					</li>
					<li className="bold">
						<a aria-label="Navigate  Skills section" href="#skills" className="waves-effect waves-dark teal-text"><i
							className="mdi-action-assessment small"></i><span>Skills</span></a>
					</li>

					<li className="bold">
						<a aria-label="Navigate  Education section" href="#education" className="waves-effect waves-dark teal-text"><i
							className="mdi-social-school small"></i><span>Education</span></a>
					</li>
					<li className="bold">
						<a aria-label="Navigate  Contact section" href="#contact" className="waves-effect waves-dark teal-text"><i
							className="mdi-content-mail small"></i><span>Contact</span></a>
					</li>
					<li className="bold">
						<a aria-label="Open Varad's Resume in a new tab"
							href="https://soumanpaul.github.io/resume.pdf" target="_blank"
							className="waves-effect waves-dark teal-text"><i className="mdi-file-folder-open small"></i><span>Resume</span></a>
					</li>
				</ul>
			</nav>
		</div>
	)
}
