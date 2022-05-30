import React from 'react'
import { Icon } from "@iconify/react";
import jsIcon from "@iconify/icons-logos/javascript";
import reactIcon from "@iconify/icons-logos/react";

import nodeIcon from "@iconify/icons-logos/nodejs";

export default function About({ resumeBasicInfo, sharedBasicInfo }) {
	console.log("resumeBasicInfo....", resumeBasicInfo);

	var profilepic;
	if (sharedBasicInfo)
		profilepic = "images/" + sharedBasicInfo.image;

	return (
		<div> <section id="about">
			<div className="col-md-12">
				<h1 style={{ color: "black" }}>
					<span>{resumeBasicInfo && resumeBasicInfo.section_name.about}</span>
				</h1>
				<div className="row center mx-auto mb-5">
					<div className="col-md-4 mb-5 center">
						<div className="polaroid">
							<span style={{ cursor: "auto" }}>
								<img
									height="250px"
									src={profilepic}
									alt="Avatar placeholder"
								/>
								<Icon
									icon={jsIcon}
									style={{ fontSize: "300%", margin: "9% 5% 0 5%" }}
								/>
								<Icon
									icon={reactIcon}
									style={{ fontSize: "300%", margin: "9% 5% 0 5%" }}
								/>
								<Icon
									icon={nodeIcon}
									style={{ fontSize: "300%", margin: "9% 5% 0 5%" }}
								/>
							</span>
						</div>
					</div>

					<div className="col-md-8 center">
						<div className="col-md-10">
							<div className="card">
								<div className="card-header">
									<span
										className="iconify"
										data-icon="emojione:red-circle"
										data-inline="false"
									></span>{" "}
									&nbsp;{" "}
									<span
										className="iconify"
										data-icon="twemoji:yellow-circle"
										data-inline="false"
									></span>{" "}
									&nbsp;{" "}
									<span
										className="iconify"
										data-icon="twemoji:green-circle"
										data-inline="false"
									></span>
								</div>
								<div
									className="card-body font-trebuchet text-justify ml-3 mr-3"
									style={{
										height: "auto",
										fontSize: "132%",
										lineHeight: "200%",
									}}
								>
									<br />
									<span className="wave">{resumeBasicInfo && resumeBasicInfo.description_header} :) </span>
									<br />
									<br />
									{resumeBasicInfo && resumeBasicInfo.description}
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
		</section>
		</div>
	)
}
