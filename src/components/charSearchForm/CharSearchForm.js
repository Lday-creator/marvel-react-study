import { useState } from 'react';
import useMarvelService from '../../services/MarvelService';
import { Formik, Form, Field, ErrorMessage as FormikErrorMessage, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Link } from 'react-router-dom';

import './charSearchForm.scss';

const CharSearchForm = () => {
    const [char, setChar] = useState(null);
    const { error, clearError, getCharacterByName } = useMarvelService();

    const onCharLoaded = (char) => {
        setChar(char);
    };

    const updateChar = (name) => {
        clearError();
        getCharacterByName(name).then(onCharLoaded);
    };

    const errorMessage = error ? (
        <div className='char__search-critical-error'>
            <ErrorMessage />
        </div>
    ) : null;
    const results = !char ? null : char.length > 0 ? (
        <div className='char__search-wrapper'>
            <div className='char__search-success'>There is! Visit {char[0].name} page?</div>
            <Link to={`/characters/${char[0].id}`} className='button button__secondary'>
                <div className='inner'>To page</div>
            </Link>
        </div>
    ) : (
        <div className='char__search-error'>The character was not found. Check the name and try again</div>
    );

    return (
        <Formik
            initialValues={{
                charName: '',
            }}
            validationSchema={Yup.object({
                charName: Yup.string().min(3, 'Minimal name 3 chars!').required('Enter character name!'),
            })}
            onSubmit={({ charName }) => updateChar(charName)}
        >
            <div className='char__search-form'>
                <Form>
                    <label className='char__search-label' htmlFor='charName'>
                        Or find a character by name:
                    </label>
                    <div className='char__search-wrapper'>
                        <Field id='charName' name='charName' type='text' placeholder='Enter name' />
                        <button type='submit' className='button button__main'>
                            <div className='inner'>find</div>
                        </button>
                    </div>
                    <FormikErrorMessage className='char__search-error' name='charName' component='div' />
                </Form>
                {results}
                {errorMessage}
            </div>
        </Formik>
    );
};

export default CharSearchForm;
