// import {useStore} from "@/stores";
// import {useState} from "react";
//
// export const AnimatedRow= () => {
//     const [toDelete, setDelete] = useState<boolean>(false);
//     const [isDeleted, setIsDelete] = useState<boolean>(false);
//
//
// }
// class AnimatedRow extends React.Component {
//     constructor(props) {
//         super(props);
//         this.state = {
//             toDelete: false,
//             isDeleted: false,
//         }
//     }
//
//     render() {
//         return (
//             !this.state.isDeleted && (
//                 <tr className={this.state.toDelete ? 'fade' : ''}>
//                     <td>Data</td>
//                     <td>Data</td>
//                     <td>Data</td>
//                     <td>Data</td>
//                     <td>
//                         <button onClick={(e) => {
//                             this.props.onDelete(e);
//                             this.setState({ toDelete: true });
//                             const that = this;
//                             setTimeout(function() { that.setState({ isDeleted: true })}, 500);
//                         }}> Delete </button>
//                     </td>
//                 </tr>
//             )
//         )
//     }
// }