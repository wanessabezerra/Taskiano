import React from "react";
import { Project } from "../../@types";
import Carousel from "../Carousel";
import ProjectWidget from "./Widget";

interface ProjectsWidgetsProps {
  projects?: Array<Project>;
}

function ProjectsWidget(props: ProjectsWidgetsProps) {
  return (
    <Carousel howMany={3} infiniteScroll>
      {props.projects?.map((project, index) => (
        <ProjectWidget key={index} {...project} />
      ))}
    </Carousel>
  );
}

export default ProjectsWidget;
