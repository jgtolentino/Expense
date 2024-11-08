"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProjectCodeSelect = void 0;
var react_1 = require("react");
var project_1 = require("../../types/project");
var ProjectCodeSelect = function (_a) {
    var value = _a.value, onChange = _a.onChange, required = _a.required;
    var _b = (0, react_1.useState)(''), searchTerm = _b[0], setSearchTerm = _b[1];
    var _c = (0, react_1.useState)(false), isOpen = _c[0], setIsOpen = _c[1];
    var filteredProjects = project_1.PROJECT_CODES.filter(function (project) {
        return project.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
            project.name.toLowerCase().includes(searchTerm.toLowerCase());
    });
    return (<div className="relative">
      <label className="block text-sm font-medium text-gray-700">
        Project Code {required && <span className="text-red-500">*</span>}
      </label>
      <div className="mt-1 relative">
        <input type="text" value={searchTerm} onChange={function (e) {
            setSearchTerm(e.target.value);
            setIsOpen(true);
        }} onFocus={function () { return setIsOpen(true); }} placeholder="Search project code..." className="block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"/>
        {isOpen && filteredProjects.length > 0 && (<div className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
            {filteredProjects.map(function (project) { return (<div key={project.code} className={"cursor-pointer select-none relative py-2 pl-3 pr-9 hover:bg-indigo-50 ".concat(value === project.code ? 'bg-indigo-50' : '')} onClick={function () {
                    onChange(project.code);
                    setSearchTerm(project.code);
                    setIsOpen(false);
                }}>
                <div className="flex items-center">
                  <span className="font-medium">{project.code}</span>
                  <span className="ml-2 text-gray-500">{project.name}</span>
                </div>
              </div>); })}
          </div>)}
      </div>
    </div>);
};
exports.ProjectCodeSelect = ProjectCodeSelect;
