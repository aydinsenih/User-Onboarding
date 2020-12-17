import React from 'react';

export default function Form(props){
    const {values, change, submit, errors, disabled} = props;

    const onChange = (evt) => {
        const {name, value, type, checked} = evt.target;
        const valueToUse = type === "checkbox" ? checked : value;
        change(name, valueToUse);
    }

    const onSubmit = (evt) => {
        evt.preventDefault();
        submit();
    }
    
    return(
        <form className="form container" onSubmit={onSubmit}>
            <div>
                <h2>Add User</h2>
                <div className="errors">
                    <div>{errors.name}</div>
                    <div>{errors.email}</div>
                    <div>{errors.password}</div>
                    <div>{errors.role}</div>
                    <div>{errors.tos}</div>
                </div>
                <div className="form-group inputs">
                    <label>
                        Name<br/>
                        <input 
                            value={values.name}
                            onChange={onChange}
                            name="name"
                            type="text"
                            />
                    </label>
                    <label>
                        Email<br/>
                        <input 
                            value={values.email}
                            onChange={onChange}
                            name="email"
                            type="text"
                            />
                    </label>
                    <label>
                        Password<br/>
                        <input 
                            value={values.password}
                            onChange={onChange}
                            name="password"
                            type="password"
                            />
                    </label>
                    <label>
                        Role
                        <select onChange={onChange} value={values.role} name="role">
                            <option value="">- Select an option -</option>
                            <option value="user">User</option>
                            <option value="mod">Moderator</option>
                            <option value="admin">Admin</option>
                            <option value="owner">Owner</option>
                        </select>
                    </label>
                    <label>
                        Terms of Service
                        <input
                            type="checkbox"
                            name="tos"
                            checked={values.tos}
                            onChange={onChange}
                        />
                    </label>
                    <button id="submitButton" disabled={disabled}>Submit</button>

                </div>
            </div>
        </form>
    )
}