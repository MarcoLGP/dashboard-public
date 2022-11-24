import { createSlice } from "@reduxjs/toolkit";

export const commentSlice = createSlice({
    name: 'comments',
    initialState: {
        comments: []
    },
    reducers: {
        setComment: (state, { payload }) => {
            state.comments.unshift(payload)
            state.comments.sort((a, b) => (a.Time > b.Time) ? -1 : ((a.Time < b.Time) ? 1 : 0))
        },
        setLike: (state, { payload }) => {

            state.comments.forEach(comment => {
                if (comment.idComment == payload.id) {
                    if (payload.type === 'add') {
                        if (comment.idComment == payload.id) {
                            comment.Like.unshift(payload.username)
                        }
                    } else {
                        comment.Like = comment.Like.filter(user => user !== payload.username)
                    }
                }
            })

        },
        setDislike: (state, { payload }) => {

            state.comments.forEach(comment => {
                if (comment.idComment == payload.id) {
                    if (payload.type == 'add') {
                        comment.Dislike.unshift(payload.username)
                    } else {
                        comment.Dislike = comment.Dislike.filter(username => username != payload.username)
                    }
                }
            })

        }
    }
})

export const { setComment, setLike, setDislike } = commentSlice.actions
export default commentSlice.reducer