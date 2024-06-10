import ModulesControls from "./ModulesControls";
import LessonControlButtons from "./LessonControlButtons";
import { BsGripVertical } from 'react-icons/bs';
import { LuPlus } from "react-icons/lu";
import { useParams } from "react-router";
import * as client from "./client";
import { IoEllipsisVertical } from "react-icons/io5";
import GreenCheckmark from "./GreenCheckmark";
import React, { useState, useEffect } from "react";
import ModuleControlButtons from "./ModuleControlButtons";
import { setModules, addModule, editModule, updateModule, deleteModule }
  from "./reducer";
import { useSelector, useDispatch } from "react-redux";
export default function Modules() {
  const { cid } = useParams();
  const [moduleName, setModuleName] = useState("");
  const { modules } = useSelector((state: any) => state.modulesReducer);
  const dispatch = useDispatch();
  const createModule = async (module: any) => {
    const newModule = await client.createModule(cid as string, module);
    dispatch(addModule(newModule));
  };
  const removeModule = async (moduleId: string) => {
    await client.deleteModule(moduleId);
    dispatch(deleteModule(moduleId));
  };
  const saveModule = async (module: any) => {
    const status = await client.updateModule(module);
    dispatch(updateModule(module));
  };

  const fetchModules = async () => {
    const modules = await client.findModulesForCourse(cid as string);
    dispatch(setModules(modules));
  };
  useEffect(() => {
    fetchModules();
  }, []);

  return (
    <div id="wd-modules">
      <ModulesControls setModuleName={setModuleName} moduleName={moduleName} addModule={() => {
          createModule({ name: moduleName, course: cid });
          setModuleName("");
        }}
        />
      <br />
      <br />
      <br />
      <br />
      <ul id="wd-modules" className="list-group rounded-0">
        {modules
          .filter((module: any) => module.course === cid)
          .map((module: any) => (
          <li className="wd-module list-group-item p-0 mb-5 fs-5 light-gray">
            <div className="wd-title p-3 ps-2 bg-light">
                <BsGripVertical className="me-2 fs-3" />
                {!module.editing && module.name}
                { module.editing && (
                  <input className="form-control w-50 d-inline-block"
                    onChange={(e) => saveModule({ ...module, name: e.target.value }) }
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        saveModule({ ...module, editing: false });
                       }
                     }}
                    value={module.name}/>
                )}

                <ModuleControlButtons
                  moduleId={module._id}
                  deleteModule={(moduleId) => 
                    { removeModule(moduleId); }}
                  editModule={(moduleId) => dispatch(editModule(moduleId))}/>

            </div>
            {module.lessons && (
              <ul className="wd-lessons list-group rounded-0">
                {module.lessons.map((lesson: any) => (
                  <li className="wd-lesson list-group-item p-3 ps-1">
                    <BsGripVertical className="me-2 fs-3" />
                    {lesson.name}
                    <LessonControlButtons />
                  </li>
                ))}
              </ul>
            )}
          </li>
        ))}
      </ul>
    </div>
);
}

  