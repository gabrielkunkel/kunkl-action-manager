import React from 'react'

class NewActionForm extends React.Component {

    render() {

      var {handleTaskSubmit, handleFormChange, formValue} = this.props;

        return (<div style={{
            // position: 'fixed', 
            // width: '25%',
            // height: '80px', 
            // backgroundColor: '#ffffed', 
            // padding: '0px', 
            // bottom: 0
            }} >
            <form onSubmit={handleTaskSubmit}>
              <label>
                <input type="text" name="name" value={formValue} onChange={handleFormChange} placeholder="What is the action?" />
              </label>
              <input type="submit" value="Submit" />
            </form>
        </div>)
    }
}

export default NewActionForm;