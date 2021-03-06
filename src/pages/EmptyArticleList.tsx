/** @jsxImportSource @emotion/react */
import FullPageMessage from "../components/FullPageMessage";
import { body2, h6 } from "../style/text";
import { css } from "@emotion/react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";

function EmptyArticleList() {
  return (
    <FullPageMessage css={css`flex-direction: column`}>
      <span css={css`${h6}; margin-bottom: 8px`}>Work in progress</span>
      <span css={body2}>First release on 27 May 2022</span>
      <Button
        variant="outlined"
        css={css`margin-top: 24px`}
        component={Link}
        to="/projects"
      >
        See Projects
      </Button>
    </FullPageMessage>
  )
}

export default EmptyArticleList