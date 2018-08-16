import React from 'react'
export default (WrappedComponent, componentName) => {

    return class extends React.Component {
        componentDidMount(){
            this.log('component mounted');
        }

        componentDidUpdate(){
            this.log('component updated');
        }

        shouldComponentUpdate(){
            this.log('component should update');
            return true;
        }
        componentWillUnmount(){
            this.log('component removed');
        }
        log(msg){
            console.log( `[${componentName}] - ${msg}`)
        }
        render() {
            return (
                <WrappedComponent {...this.props} />
            )
        }
    }
}
