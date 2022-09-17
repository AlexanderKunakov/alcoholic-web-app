import React, {FC, useState} from 'react';
import {ClickAwayListener, IconButton, Input, InputAdornment, Tooltip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useCreateLinkMutation} from "../../../store/api/InvitationLinkApi";
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import ClearIcon from '@mui/icons-material/Clear';

interface IInvitationLinkButton {
    eventId: string,
}

const InvitationLinkButton: FC<IInvitationLinkButton> = ({eventId}) => {
    const [open, setOpen] = useState(false);
    const [invitationLink, setInvitationLink] = useState<string>("");
    const [createLink] = useCreateLinkMutation();

    function handleInvitationLinkOnClick() {
        createLink(eventId).unwrap()
            .then(res => {
                if (res.id) {
                    const linkUrl = `event/invite/${res.id}`;
                    setInvitationLink(linkUrl);
                    navigator.clipboard.writeText(linkUrl)
                        .then(() => setOpen(true));
                }
            });
    }

    return <Input id={"create-invitation-link"}
                  sx={{width: "25rem"}}
                  disabled
                  placeholder={"Click \"+\" to create an invitation link"}
                  value={invitationLink}
                  endAdornment={
                      <InputAdornment position="end">
                          <IconButton>
                              {invitationLink.length > 0
                                  ? <ClickAwayListener onClickAway={() => setOpen(false)}>
                                      <Tooltip
                                          PopperProps={{disablePortal: true}}
                                          onClose={() => setOpen(false)}
                                          open={open}
                                          disableFocusListener
                                          disableHoverListener
                                          disableTouchListener
                                          title="Link copied to clipboard"
                                      >
                                          <ContentCopyIcon
                                              onClick={() => {
                                                  navigator.clipboard.writeText(invitationLink)
                                                      .then(() => setOpen(true))
                                              }}/>
                                      </Tooltip>
                                  </ClickAwayListener>
                                  : <AddIcon onClick={handleInvitationLinkOnClick}/>
                              }
                          </IconButton>
                          <IconButton disabled={invitationLink.length === 0}
                                      onClick={() => setInvitationLink("")}>
                              <ClearIcon/>
                          </IconButton>
                      </InputAdornment>
                  }
    />;
};

export default InvitationLinkButton;