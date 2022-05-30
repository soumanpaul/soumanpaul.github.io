import React from 'react'
import "./App.scss";
import About from './components/About';
import Header from './components/Header';
import Projects from './components/Projects';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Footer from './components/Footer';
import SideBar from './components/SideBar';

function App() {

  const [sharedData, setSharedData] = React.useState({});
  const [resumeData, setResumeData] = React.useState({});

  React.useEffect(() => {
    loadSharedData()
    loadResumeFromPath()
  }, []);

  function loadSharedData() {
    let url = `portfolio_shared_data.json`;
    let fetchParams = {
      method: 'GET',
      dataType: "json",
    }
    fetch(url, fetchParams)
      .then(async (res) => {
        res.text().then(async (res) => {
          let result = JSON.parse(res);
          setSharedData(result);
          console.log("result.....", result);
        })
      })
  }

  const loadResumeFromPath = () => {
    let url = `res_primaryLanguage.json`;
    let fetchParams = {
      method: 'GET',
      dataType: "json",
    }
    fetch(url, fetchParams)
      .then(async (res) => {
        res.text().then(async (res) => {
          let result = JSON.parse(res);
          setResumeData(result);
          console.log("Resumr.....", result);
        })
      })
  }

  return (
    <>
      <SideBar />
      <Header sharedData={sharedData} />
      <About
        resumeBasicInfo={resumeData.basic_info}
        sharedBasicInfo={sharedData.basic_info}
      />
      <Projects
        resumeProjects={resumeData.projects}
        resumeBasicInfo={resumeData.basic_info}
      />
      <Skills
        resumeBasicInfo={resumeData.basic_info}
        sharedSkills={sharedData.skills}
      />
      <Experience
        resumeExperience={resumeData.experience}
        resumeBasicInfo={resumeData.basic_info}
      />

      <Footer
        sharedBasicInfo={sharedData.basic_info}
      />
    </>
  );
}

export default App;
