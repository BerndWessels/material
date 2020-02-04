/**
 * Dependencies
 */
import React, {useEffect} from "react";

/**
 * AWS Amplify
 */
import Auth from "@aws-amplify/auth";
import API, {graphqlOperation} from "@aws-amplify/api";

/**
 * Hooks
 */
import { useRedux } from "../../providers/redux";

/**
 * Redux
 */
import { tryChangeRouteActionCreator } from "../../redux/action-creators.g";

/**
 * Components
 */
import Button from "@material-ui/core/Button";
import DeleteIcon from "@material-ui/icons/Delete";

/**
 * Styles
 */
// import { makeStyles } from "@material-ui/core/styles";
//
// const useStyles = makeStyles(theme => ({
//   grow: {
//     flexGrow: 1
//   }
// }));


function Request() {
    useEffect(() => {
        let subscription;
        setTimeout(() => {
            console.log('subscribing');
            subscription = API.graphql(
                graphqlOperation(`subscription Inbox {
    inbox(to: "Nadia") {
        body
        to
        from
        sentAt
    }
}`)
            ).subscribe({
                next: (todoData) => console.log("baba", todoData)
            });
        }, 5000);
        return () => {
            subscription.unsubscribe();
        }
    }, []);
    return (
        <>
            <button onClick={() => {
                API.graphql(graphqlOperation(`query {
    me
}
`))
                    .then(data => console.log(data))
                    .catch(err => console.error(err));

            }}>request
            </button>
            <button onClick={() => {
                API.graphql(graphqlOperation(`mutation Page {
    page(to: "Nadia", body: "Hello, World!") {
        body
        to
        from
        sentAt
    }
}`))
                    .then(data => console.log(data))
                    .catch(err => console.error(err));

            }}>mutate
            </button>
            <input type="text"/>
        </>
    );
}


/**
 * Component
 */
const HomePage = () => {
  //const classes = useStyles();
  const [, dispatch] = useRedux();
  return (
    <>
      <p>Hello</p>
      <Button
        variant="contained"
        startIcon={<DeleteIcon />}
        onClick={() => Auth.signOut()}
      >
        Default
      </Button>
      <Button
        variant="outlined"
        color="primary"
        onClick={e => dispatch(tryChangeRouteActionCreator({ route: "about" }))}
      >
        Primary
      </Button>
        <Request/>
    </>
  );
};

export default HomePage;
