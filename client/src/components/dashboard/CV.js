import React, { useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { Link } from "react-router-dom";
import CV from "./CvPdf";
import { PDFViewer } from "@react-pdf/renderer";
import CVTEMP1 from "./CvPdfTem1";
import CVTEMP2 from "./CvPdfTem2";

function CVForm() {
  // variables for form validation
  const { register, control, handleSubmit, reset } = useForm();

  // Ref to store the form data
  const [cvData, setCvData] = useState({});

  //  Feild Array for education section
  const {
    fields: educationalFeilds,
    append: educationalAppend,
    remove: educationalRemove,
  } = useFieldArray({
    control,
    name: "education",
  });

  // Feild Array for experience section
  const {
    fields: experianceFeilds,
    append: experianceAppend,
    remove: experianceRemove,
  } = useFieldArray({
    control,
    name: "experiance",
  });

  // Feild Array for certification section
  const {
    fields: certificationFeilds,
    append: certificationAppend,
    remove: certificationRemove,
  } = useFieldArray({
    control,
    name: "certification",
  });

  // Feils Array for skills section
  const {
    fields: skillFeilds,
    append: skillAppend,
    remove: skillRemove,
  } = useFieldArray({
    control,
    name: "skill",
  });

  // Form Submit function
  const onSubmit = (data) => {
    // store the form data in cvData Ref
    setCvData(data);
    console.log(data);
  };

  // Form Clear function
  const clearForm = () => {
    // reseting form input fields
    reset();
    educationalRemove();
    experianceRemove();
    certificationRemove();
    skillRemove();
  };

  const [activeChild, setActiveChild] = useState(1);

  const handleClick = (child) => {
    setActiveChild(child);
  };

  return (
    <div className="container">
      <div className="ml-10">
        {/* Back Button */}
        {/* <i className="fa fa-chevron-left text-dark" aria-hidden="true"></i> Back */}
        <Link to="/dashboard" aria-hidden="true">
          <button className="mb-2 btn">
            {" "}
            <div className="fa fa-chevron-left text-dark"></div> Back
          </button>
        </Link>{" "}
        <div className="lead">
          <i className="fas fa-code-branch"></i>
          Add your cv details here.
        </div>
        <div className="flex flex-col gap-3 lg:flex-row">
          {/* CV Details form */}
          <form
            className="w-full form lg:w-2/5"
            onSubmit={handleSubmit(onSubmit)}
          >
            {/* Input for name */}
            <input
              type="text"
              className="form-group"
              placeholder="Name"
              autoComplete="off"
              id="name"
              {...register("name")}
            />

            {/* Input for email */}
            <input
              type="text"
              className="form-group"
              placeholder="Email"
              autoComplete="off"
              id="email"
              {...register("email")}
            />

            {/* Input for Address */}
            <input
              className="form-group"
              type="text"
              placeholder="Address"
              autoComplete="off"
              id="address"
              {...register("address")}
            />

            {/* Inpit for contact */}
            <input
              className="form-group"
              type="text"
              placeholder="Contact Number"
              autoComplete="off"
              id="contact-number"
              {...register("contactNumber")}
            />

            {/* Input for about section */}
            <input
              type="text"
              className="form-group"
              placeholder="About"
              autoComplete="off"
              id="about"
              {...register("about")}
            />

            {/* Education feilds  */}
            {educationalFeilds.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-2 form-group">
                <div className="flex items-center justify-between">
                  <h1 className="text-gray-500">Education # {index + 1}</h1>
                  {/* Cross Button */}
                  <button
                    type="button"
                    onClick={() => educationalRemove(index)}
                    className="text-xl text-red-500"
                  >
                    ✘
                  </button>
                </div>
                {/* Institution input */}
                <input
                  type="text"
                  placeholder="Institution Name"
                  autoComplete="off"
                  id={`education[${index}].institution`}
                  {...register(`education[${index}].institution`)}
                />
                <div className="flex gap-2 ">
                  {/* Degree Input */}
                  <input
                    type="text"
                    placeholder="Degree"
                    autoComplete="off"
                    id={`education[${index}].degree`}
                    {...register(`education[${index}].degree`)}
                  />

                  {/* Grades Input */}
                  <input
                    type="text"
                    placeholder="Grades"
                    autoComplete="off"
                    id={`education[${index}].grades`}
                    {...register(`education[${index}].grades`)}
                  />
                </div>
              </div>
            ))}

            {/* Add education Button */}
            <button
              className="mb-1 btn"
              type="button"
              onClick={() => educationalAppend({})}
            >
              📒 Add Education
            </button>

            {/* Experiance Feilds */}
            {experianceFeilds.map((field, index) => (
              <div key={field.id} className="flex flex-col gap-2 form-group">
                <div className="flex items-center justify-between">
                  <h1 className="text-gray-500">Experiance # {index + 1}</h1>
                  {/* Cross Button */}
                  <button
                    type="button"
                    onClick={() => experianceRemove(index)}
                    className="text-xl text-red-500"
                  >
                    ✘
                  </button>
                </div>
                {/* Company Input */}
                <input
                  type="text"
                  placeholder="Company Name"
                  autoComplete="off"
                  id={`experiance[${index}].company`}
                  {...register(`experiance[${index}].company`)}
                />
                <div className="flex gap-2">
                  {/* Job Input */}
                  <input
                    type="text"
                    placeholder="Job Title"
                    autoComplete="off"
                    id={`experiance[${index}].jobTitle`}
                    {...register(`experiance[${index}].jobTitle`)}
                  />
                  {/* Duaration Input */}
                  <input
                    type="text"
                    placeholder="Duaration"
                    autoComplete="off"
                    id={`experiance[${index}].duaration`}
                    {...register(`experiance[${index}].duaration`)}
                  />
                </div>
                {/* Responsiblites Input */}
                <input
                  type="text"
                  placeholder="Responsiblites "
                  autoComplete="off"
                  id={`experiance[${index}].responsiblites`}
                  {...register(`experiance[${index}].responsiblites`)}
                />
              </div>
            ))}

            {/* Add Experiance Button */}
            <button
              type="button"
              onClick={() => experianceAppend({})}
              className="mb-1 btn"
            >
              💼 Add Experiance
            </button>

            {/* Certifications Feilds */}
            {certificationFeilds.map((field, index) => (
              <div key={field.id} className="flex flex-col form-group">
                <div className="flex items-center justify-between">
                  <h1 className="text-gray-500">Certification # {index + 1}</h1>
                  {/* Cross Button */}
                  <button
                    type="button"
                    onClick={() => certificationRemove(index)}
                    className="text-xl text-red-500"
                  >
                    ✘
                  </button>
                </div>
                {/* Certification Input */}
                <input
                  type="text"
                  placeholder="Certification"
                  autoComplete="off"
                  id={`certification[${index}].name`}
                  {...register(`certification[${index}].name`)}
                />
              </div>
            ))}

            {/* Add Certification Button */}
            <button
              type="button"
              onClick={() => certificationAppend({})}
              className="mb-1 btn"
            >
              🏅 Add Certifications
            </button>

            {/* Skills Feilds */}
            {skillFeilds.map((field, index) => (
              <div key={field.id} className="flex flex-col form-group">
                <div className="flex items-center justify-between">
                  <h1 className="text-gray-500">Skill # {index + 1}</h1>
                  {/* Cross Button */}
                  <button
                    type="button"
                    onClick={() => skillRemove(index)}
                    className="text-xl text-red-500"
                  >
                    ✘
                  </button>
                </div>
                {/* Skill name input */}
                <input
                  type="text"
                  placeholder="Skill"
                  autoComplete="off"
                  id={`skill[${index}].name`}
                  {...register(`skill[${index}].name`)}
                />
              </div>
            ))}

            {/* Add Skill Button */}
            <button
              type="button"
              className="mb-1 btn"
              onClick={() => skillAppend({})}
            >
              🎯 Add Skills
            </button>

          {/* Form Submit button */}
          <button type="submit" className="mb-1 btn btn-primary ">
            Save
          </button>
          <button onClick={clearForm} className="mb-1 btn btn-danger ">
            Clear
          </button>
        </form>
        <div className="w-full h-[800px] lg:w-3/5">
          <button className="m-1 btn" onClick={() => handleClick(1)}>
            Template 1
          </button>
          <button className="m-1 btn" onClick={() => handleClick(2)}>
            Template 2
          </button>
          <button className="m-1 btn" onClick={() => handleClick(3)}>
            Template 3
          </button>{" "}
          {activeChild == 1 ? (
            <PDFViewer className="w-full h-[800px] ">
              <CV {...cvData} />
            </PDFViewer>
          ) : null}
          {activeChild == 2 ? (
            <PDFViewer className="w-full h-[800px] ">
              <CVTEMP1 {...cvData} />
            </PDFViewer>
          ) : null}
          {activeChild == 3 ? (
            <PDFViewer className="w-full h-[800px] ">
              <CVTEMP2 {...cvData} />
            </PDFViewer>
          ) : null}
        </div>
      </div>
      </div>
    </div>
  );
}

export default CVForm;
