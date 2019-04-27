const db = require('_helpers/db');
const Employee = db.Employee;

module.exports = {
    create,
    search,
    update,
    delete: _delete
};

async function create(employeeParam) {
    const employee = new Employee(employeeParam);
    await employee.save();
}

async function search(params) {
    let condition = !params.search ? {} :
        { 'full_name' : {'$regex' : params.search, '$options' : 'i' }};

    let result = Employee
        .paginate(condition, {
            page: params.page,
            limit: params.limit,
            populate: 'position'
        });

    return await result;
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