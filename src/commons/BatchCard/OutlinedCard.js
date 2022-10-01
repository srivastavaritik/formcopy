import { makeStyles } from "@material-ui/core";
import React from "react";
import { Modal } from "react-bootstrap";
import { Link } from "react-router-dom";

const useStyles = makeStyles(() => ({

  batchName: {
    minWidth: "250px",
    marginTop: "1rem",
    fontSize: "3rem",
    borderRadius: "1rem",
    border: "1px solid black",
    boxShadow: "1px 1px 1rem black",
    background: "#3f51b5",
    color:"white"
  },
  mdl: {
    top: "3rem",
  },
  btns:{
    display:"flex",
    justifyContent:"space-between"
  },
  btn:{
    margin:'1rem',
    padding:'.5rem',
    borderRadius:'.5rem'
  }
}));

const OutlinedCard = (props) => {
  const [modalIsOpen, setModalIsOpen] = React.useState(false);
  const classes = useStyles();
  const buttonClickHandler = () => {
    setModalIsOpen(true);
  };

  return (
    <>
      <div className={classes.container}>
        <button onClick={buttonClickHandler} className={classes.batchName}>
          {props.name}
        </button>
        <div className={classes.mdl}>
          <Modal
            className={classes.mdl}
            show={modalIsOpen}
            fullscreen="md-down"
            onHide={() => setModalIsOpen(false)}
          >
            <Modal.Header closeButton>
              <Modal.Title>{props.name}</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <div className={classes.btns}>
                <button className={classes.btn} ><Link to='/batch-details/CSE/A/subjects/students-lists'>CSE-A</Link></button>
                <button className={classes.btn} ><Link to='/batch-details/CSE/B/subjects/students-lists'>CSE-B</Link></button>
                <button className={classes.btn} ><Link to='/batch-details/CSE/C/subjects/students-lists'>CSE-C</Link></button>
              </div>
            </Modal.Body>
          </Modal>
        </div>
      </div>
    </>
  );
};

export default OutlinedCard;
