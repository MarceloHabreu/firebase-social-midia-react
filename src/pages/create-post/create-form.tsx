import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore"
import { auth, db } from "../../config/firebase"
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface CreateFormData {
    title: string;
    description: string;
}

export const CreateForm = () => {

    const navigate = useNavigate();
    const [user] = useAuthState(auth)

    const schema = yup.object().shape({
        title: yup.string().required("You must add a title!"),
        description: yup.string().required("You must add a description for your post!")
    });

    const { register, handleSubmit, formState: { errors }, } = useForm <CreateFormData> ({
        resolver: yupResolver(schema)
    })

    const postsRef = collection(db, "posts");
    const onCreatePost = async (data: CreateFormData) => {
        await addDoc(postsRef, {
            /* title: data.title,
            description: data.description, Ao invés disso, faça isso:*/
            ...data,
            username: user?.displayName,
            userId: user?.uid,
        })
        navigate("/")
    }
    return(
        <div className="create-post">
            <form onSubmit={handleSubmit(onCreatePost)} className="post-form">
                <input placeholder="Title..." {...register("title")}/>
                <p style={{color: "red",textShadow: "2px 3px 4px  2px black"}}>{errors.title?.message}</p>
                <textarea placeholder="Description..." {...register("description")}/>
                <p style={{color: "red",textShadow: "2px 3px 4px  2px black"}}>{errors.description?.message}</p>
                <input type="submit"/>
            </form>
        </div>
    )
}