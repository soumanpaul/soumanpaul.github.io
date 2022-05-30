import React from 'react'
import ProjectDetailsModal from './ProjectDetailsModal'

var sectionName
var projects
export default function Projects({ resumeProjects, resumeBasicInfo }) {

	const [detailsModalShow, setDetailsModalShow] = React.useState(false)
	const [deps, setDeps] = React.useState({})

	let detailsModalShow1 = (data) => {
		setDetailsModalShow(true)
		setDeps(data)
	};
	let detailsModalClose = () => setDetailsModalShow(false);

	if (resumeProjects && resumeBasicInfo) {
		sectionName = resumeBasicInfo.section_name.projects;
		projects = resumeProjects.map(function (projects) {
			return (
				<div
					className="col-sm-12 col-md-6 col-lg-4"
					key={projects.title}
					style={{ cursor: "pointer" }}
				>
					<span className="portfolio-item d-block">
						<div className="foto"
							onClick={() => detailsModalShow1(projects)}
						>
							<div>
								<img
									src={projects.images[0]}
									alt="projectImages"
									height="230"
									style={{ marginBottom: 0, paddingBottom: 0, position: 'relative' }}
								/>
								<span className="project-date">{projects.startDate}</span>
								<br />
								<p className="project-title-settings mt-3">
									{projects.title}
								</p>
							</div>
						</div>
					</span>
				</div>
			);
		});
	}

	return (
		<div> <section id="portfolio">
			<div className="col-md-12">
				<h1 className="section-title" style={{ color: "black" }}>
					<span>{sectionName}</span>
				</h1>
				<div className="col-md-12 mx-auto">
					<div className="row mx-auto">{projects}</div>
				</div>
				<ProjectDetailsModal
					show={detailsModalShow}
					onHide={detailsModalClose}
					data={deps}
				/>
			</div>
		</section></div>
	)
}
