const db = require('_helpers/db');
const Employee = db.Employee;

module.exports = {
    create,
    read,
    update,
    delete: _delete
};

async function create(employeeParam) {
    const employee = new Employee(employeeParam);
    await employee.save();
}

async function read() {
    console.log(Employee);
    return await Employee.find();
}

async function update(id, employeeParam) {
    const employee = await Employee.findById(id);

    if (!employee) throw 'Employee not found';

    Object.assign(employee, employeeParam);

    await employee.save();
}

async function _delete(id) {
    await Employee.findByIdAndRemove(id);
}