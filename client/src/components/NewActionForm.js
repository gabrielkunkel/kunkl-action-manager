import React from 'react'

class NewActionForm extends React.Component {

    render() {

      var {handleTaskSubmit, handleFormChange} = this.props;

        return (<div>
            <form onSubmit={handleTaskSubmit}>
              <label>
                <input type="text" name="name" onChange={handleFormChange} placeholder="What is the action?" />
              </label>
              <input type="submit" value="Submit" />
            </form>
        </div>)
    }
}

export default NewActionForm;