import React from "react";
import {makeStyles} from '@material-ui/core';
import ProfList from './profList'
import Button from "@material-ui/core/Button";
import SendIcon from '@material-ui/icons/Send';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
    },
}));

export default function body() {
    const classes = useStyles();

    return (
        <div className={'container-fluid row justify-content-center'}>
            <ProfList/>
            <div className={'Form ml-3 col-12 col-lg-6'}>
                <h1>Подача документов</h1>
                <p className="text-justify">
                    С другой стороны начало повседневной работы по формированию позиции в значительной степени
                    обуславливает
                    создание существенных финансовых и административных условий.
                    Равным образом новая модель организационной деятельности требуют от нас анализа новых предложений.
                </p>
                <p className="text-justify">
                    Разнообразный и богатый опыт сложившаяся структура организации позволяет оценить значение позиций,
                    занимаемых участниками в отношении поставленных задач.
                    Не следует, однако забывать, что сложившаяся структура организации позволяет оценить значение
                    соответствующий условий активизации.
                    Значимость этих проблем настолько очевидна, что постоянное информационно-пропагандистское
                    обеспечение
                    нашей деятельности обеспечивает широкому кругу (специалистов) участие в формировании направлений
                    прогрессивного развития.
                    Таким образом рамки и место обучения кадров требуют от нас анализа существенных финансовых и
                    административных условий.
                </p>
                <p className="text-justify">

                    Задача организации, в особенности же постоянное информационно-пропагандистское обеспечение нашей
                    деятельности играет важную роль в формировании системы обучения кадров, соответствует насущным
                    потребностям.
                    С другой стороны постоянное информационно-пропагандистское обеспечение нашей деятельности требуют от
                    нас
                    анализа существенных финансовых и административных условий.
                    Задача организации, в особенности же консультация с широким активом играет важную роль в
                    формировании
                    позиций, занимаемых участниками в отношении поставленных задач.
                    Задача организации, в особенности же постоянное информационно-пропагандистское обеспечение нашей
                    деятельности требуют определения и уточнения модели развития.
                    Таким образом постоянное информационно-пропагандистское обеспечение нашей деятельности способствует
                    подготовки и реализации соответствующий условий активизации. </p>

                <Button
                    variant="contained"
                    color="primary"
                    className={classes.button}
                    endIcon={<SendIcon/>}
                >
                    Отправить
                </Button>
            </div>
        </div>
    );
}
