import React, { Component } from "react";

// type Props = {
//   name?: string
// } & Partial<typeof defaultProps>;

interface Props {
  age: number,
  name: string
}

class ScratchPrize extends Component<Props> {
  static defaultProps = {
    name: '呱呱乐',
  };

  constructor(props:Props){
    super(props);
    this.state = {
      name: '刮刮乐'
    }
  }
  componentDidMount(){
    console.log('Class Component ScratchPrize componentDidMount');
  } 
  shouldComponentUpdate(nextProps: any, nextState: any){
    console.log('Class Component ScratchPrize shouldComponentUpdate');
    console.log(nextProps, nextState)
    return true
  }
  getSnapshotBeforeUpdate(_prevProps: any, _prevState: any){
    console.log(_prevProps, _prevState);
    console.log('Class Component ScratchPrize getSnapshotBeforeUpdate');
  }
  componentDidUpdate(prevProps: Props, prevState: any, snapshot: any){
    console.log('Class Component ScratchPrize componentDidUpdate');
    console.log(prevProps, prevState, snapshot)
  }
  componentWillUnmount(){
    console.log('Class Component ScratchPrize componentWillUnmount');
  }

  
  
  render(): React.ReactNode {
    console.log('Class Component ScratchPrize')
    return (
      <div>{this.props.name}</div>
    )
  }
}
export default ScratchPrize;


// https://www.cnblogs.com/Wayou/p/react_typescript_default_props.html
