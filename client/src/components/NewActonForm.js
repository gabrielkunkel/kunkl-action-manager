import React from 'react'

class NewActonForm extends React.Component {

    render() {
        return (<div>
            <form>
              <label>
                <input type="text" name="name" />
              </label>
              <input type="submit" value="Submit" />
            </form>
        </div>)
    }
}

export default NewActonForm;