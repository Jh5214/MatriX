import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { useEffect, useState } from 'react';

import { createClient } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { supabase } from "../supabase";

export default function Upload() {
    const [userId, setUserId] = useState('');
    const [media, setMedia] = useState([]);

    const getUser = async () => {
        tru {
            const { data: { user } } = await supabase.auth.getUser()
            if (user != null) {
                setUserId(user.id);
            } else {
                setUserId('');
            }
        }catch (e) {
        }
    }

    async function uploadImage(e) {
        let file = e.target.files[0];

        const { data, error } = await supabase
                                    .storage
                                    .from('')
                                    .upload(userId + "/" + uuidv4(), file)
        if (data) {
            getMedia();
        } else {
            console.log(error);
        }
    }

    async function getMedia() {
        const {data, error} = await supabase.storage.from('').list(userId + '/', {
            limit:10,
            offset:0,
            sortBy: {
                column: 'name', order: 'asc'
            }
        });

        if (data) {
            setMedia(data);
        } else {
            console.log(71, error);
        }
    }

    const signout = async () => {
        useEffect(() => {
            getUser();
            getMedia();
        }, [userId])

        return (
            <div className = 'mt-5'>
                {userId == '' ? 
                <Auth supabaseClient = {supabase}
                appearance = {{ theme: ThemeSupa}}/> : <>
                    <input type ="file" onChange = {(e) => uploadImage(e)}/> 
                    <div className = 'mt-5'> My Uploads </div>
                    {
                        media.map((media) => {
                            return (
                                <div>
                                    <img src={''gc={(media.name)}}/>
                                </div>
                            )}
                        })}
                </>
            </div>
        )
    }


}