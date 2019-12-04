import React from 'react'
import TextField from '@material-ui/core/TextField';

class NewActionForm extends React.Component {

    render() {

      var {handleTaskSubmit, handleFormChange, formValue} = this.props;

        return (<div>
            <form onSubmit={handleTaskSubmit}>
                <TextField 
                  type="text"
                  id="standard-basic" 
                  name="name" 
                  value={formValue}
                  autoFocus={true}
                  onChange={handleFormChange} 
                  placeholder="What is the action?" 
                  style={{
                    position: 'absolute', 
                    width: '90%',
                    height: '45px',
                    bottom: 0
                    }}
                  />
              <input hidden type="submit" value="Submit" />
            </form>
        </div>)
    }
}

export default NewActionForm;