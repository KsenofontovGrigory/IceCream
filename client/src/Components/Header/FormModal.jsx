import React from 'react';

const FormModal = ({formik, textErrorHeaderEmail, textErrorHeaderLogin, inputs, nameButton}) => {
    return (
        <form onSubmit={formik.handleSubmit}>
            {inputs.map((item) => (
                <div key={item.name}>
                    <label>{item.label}</label>
                    <input
                        name={item.name}
                        placeholder={item.placeholder}
                        type="text"
                        value={formik.values[item.name] || ''}
                        onBlur={formik.handleBlur}
                        onChange={formik.handleChange}
                        className={formik.errors[item.name] && "border-input-error"}
                    />
                    {formik.touched[item.name] && formik.errors[item.name] ? (
                        <div className="added-text-error">{formik.errors[item.name]}</div>
                    ) : null}
                </div>
            ))}
            <span className="added-text-error">{textErrorHeaderEmail}</span>
            <span className="added-text-error">{textErrorHeaderLogin}</span>
            <button type="submit" className="button-modal">{nameButton}</button>
        </form>
    );
};

export default FormModal;