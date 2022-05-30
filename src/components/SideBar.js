import React from 'react'
import '../Style.css'
export default function SideBar() {
	return (
		<div>
			<nav class="">
				<ul class="side-nav fixed section table-of-contents">
					<li class="logo">
						<a id="logo-container" aria-label="Navigate to the beginning of the page" href="#intro"
							class="brand-logo grey-blue-text">
							<img src="images/me.jpg" class="circle img-responsive profile-pic" alt="avatar" />
						</a>
					</li>

					<li class="bold">
						<a aria-label="Navigate to the About section" href="#about" class="waves-effect waves-dark teal-text"><i
							class="mdi-social-person small"></i><span>About</span></a>
					</li>
					<li class="bold">
						<a aria-label="Navigate to the Experience section" href="#resume"
							class="waves-effect waves-dark teal-text"><i
								class="mdi-action-trending-up small"></i><span>Experience</span></a>
					</li>

					<li class="bold">

						<a aria-label="Navigate to the Projects section" href="#portfolio" class="waves-effect waves-dark teal-text"><i
							class="mdi-av-my-library-books small"></i><span>Projects</span></a>
					</li>

					<li class="bold">

						<a aria-label="Navigate to the Skills section" href="#skills" class="waves-effect waves-dark teal-text"><i
							class="mdi-action-assessment small"></i><span>Skills</span></a>
					</li>

					<li class="bold">

						<a aria-label="Navigate to the Education section" href="#education" class="waves-effect waves-dark teal-text"><i
							class="mdi-social-school small"></i><span>Education</span></a>
					</li>

					<li class="bold">

						<a aria-label="Navigate to the Contact section" href="#contact" class="waves-effect waves-dark teal-text"><i
							class="mdi-content-mail small"></i><span>Contact</span></a>
					</li>

					<li class="bold">
						<a aria-label="Open Varad's resume in a new tab" href="https://soumanpaul.github.io/resume.pdf" target="_blank"
							class="waves-effect waves-dark teal-text"><i class="mdi-file-folder-open small"></i><span>Resume</span></a>
					</li>
				</ul>
			</nav>

			<nav class="hide-on-large only trigger z-depth-1">
				<a aria-label="Toggle visibility of the mobile navbar" href="#" data-activates="slide-out"
					class="button-collapse"><i class="mdi-navigation-menu"></i></a>
				<div class="name-title">
					<a id="name" aria-label="Navigate to the beginning of the page" href="#" class="teal-text">Varad
						Bhogayata</a><span class="black-text">Software Developer</span>
				</div>
			</nav>

			<nav class="hide-on-large only">
				<ul id="slide-out" class="side-nav">
					<li class="bold">
						<a aria-label="Navigate to the About section" href="#about" class="waves-effect waves-dark teal-text"><i
							class="mdi-social-person small"></i><span>About</span></a>
					</li>
					<li class="bold">
						<a aria-label="Navigate to the Experience section" href="#experience"
							class="waves-effect waves-dark teal-text"><i
								class="mdi-action-trending-up small"></i><span>Experience</span></a>
					</li>
					<li class="bold">
						<a aria-label="Navigate to the Projects section" href="#projects" class="waves-effect waves-dark teal-text"><i
							class="mdi-av-my-library-books small"></i><span>Projects</span></a>
					</li>
					<li class="bold">
						<a aria-label="Navigate to the Skills section" href="#skills" class="waves-effect waves-dark teal-text"><i
							class="mdi-action-assessment small"></i><span>Skills</span></a>
					</li>

					<li class="bold">
						<a aria-label="Navigate to the Education section" href="#education" class="waves-effect waves-dark teal-text"><i
							class="mdi-social-school small"></i><span>Education</span></a>
					</li>
					<li class="bold">
						<a aria-label="Navigate to the Contact section" href="#contact" class="waves-effect waves-dark teal-text"><i
							class="mdi-content-mail small"></i><span>Contact</span></a>
					</li>
					<li class="bold">
						<a aria-label="Open Varad's Resume in a new tab"
							href="https://soumanpaul.github.io/resume.pdf" target="_blank"
							class="waves-effect waves-dark teal-text"><i class="mdi-file-folder-open small"></i><span>Resume</span></a>
					</li>
				</ul>
			</nav>
		</div>
	)
}
