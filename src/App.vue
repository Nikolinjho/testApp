<template>
    <div id="app" class="container">
        <div class="auth">
            <h1 class="auth__title">Регистрация</h1>
            <div class="auth__text">
                Уже есть аккаунт?
                <router-link class="auth__link" to="#" tag="a"
                    >Войти</router-link
                >
            </div>
            <form
                @change="log"
                @submit.prevent="onSubmit()"
                class="auth-form"
                novalidate="true"
            >
                <div class="auth-form__row">
                    <div class="auth-form__row-title">Имя</div>
                    <input
                        class="auth-form__row-input"
                        placeholder="Валентин Петров"
                        type="text"
                        @input="$v.name.$touch()"
                        v-model.trim="name"
                    />
                    <div
                        class="auth-form__error"
                        v-if="$v.name.$dirty && !$v.name.isName"
                    >
                        Введено некорректное значение
                    </div>
                </div>
                <div class="auth-form__row">
                    <div class="auth-form__row-title">Email</div>
                    <input
                        class="auth-form__row-input"
                        placeholder="Введите ваш email"
                        type="email"
                        @input="$v.email.$touch()"
                        v-model.trim="email"
                    />
                    <div
                        class="auth-form__error"
                        v-if="$v.email.$dirty && !$v.email.email"
                    >
                        Введено некорректное значение
                    </div>
                </div>
                <div class="auth-form__row">
                    <div class="auth-form__row-title">Номер телефона</div>
                    <input
                        class="auth-form__row-input"
                        placeholder="Введите номер телефона"
                        type="text"
                        @input="$v.phone.$touch()"
                        v-model.trim="phone"
                        maxLength="11"
                    />
                    <div
                        class="auth-form__error"
                        v-if="$v.phone.$dirty && !$v.phone.isNum"
                    >
                        Введено некорректное значение
                    </div>
                </div>
                <div class="auth-form__row">
                    <div class="auth-form__row-title">Язык</div>
                    <div
                        class="auth-form__row-input select"
                        :class="{ active: toggle }"
                        @click="(toggle = !toggle), $v.lang.$touch()"
                    >
                        <span :class="{ default: !lang }">
                            {{ lang ? lang : defaultLang }}</span
                        >

                        <div class="dropdown" v-if="toggle">
                            <div
                                class="dropdown__item"
                                v-for="language in languages"
                                :key="language.id"
                                @click="
                                    (lang = language.title), (selected = true)
                                "
                            >
                                {{ language.title }}
                            </div>
                        </div>
                    </div>
                    <div
                        class="auth-form__error"
                        v-if="$v.email.$dirty && !$v.lang.isSelected"
                    >
                        Введено некорректное значение
                    </div>
                </div>
                <label
                    class="auth-form__row bem-ckeckbox"
                    for="chk_1"
                    @imput="$v.checkpoint.$touch()"
                >
                    <input
                        class="bem-ckeckbox__input"
                        type="checkbox"
                        id="chk_1"
                        v-model="checkpoint"
                    />
                    <span class="bem-ckeckbox__fake"></span>
                    <div class="bem-ckeckbox__text">
                        Принимаю
                        <router-link class="auth__link" to="#" tag="a"
                            >условия</router-link
                        >
                        использования
                    </div>
                </label>
                <div class="auth-form__row">
                    <button
                        type="submit"
                        class="auth-form__row-btn btn"
                        :class="{ active: isReady }"
                    >
                        Зарегистрироваться
                    </button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>
import {
    required,
    email,
    minLength,
    maxLength,
    helpers,
    withParams,
} from "vuelidate/lib/validators";

export default {
    name: "App",
    data() {
        return {
            name: "",
            email: "",
            phone: "",
            defaultLang: "Язык",
            lang: "",
            selected: false,
            checkpoint: false,
            toggle: false,
            languages: [
                {
                    id: 0,
                    title: "Русский",
                },
                {
                    id: 1,
                    title: "Английский",
                },
                {
                    id: 2,
                    title: "Китайский",
                },
                {
                    id: 3,
                    title: "Испанский",
                },
            ],
        };
    },
    mounted() {
        console.log(this.$v);
    },
    methods: {
        log() {
            console.log(this.$v);
        },
        onSubmit() {
            console.log(1);
            if (this.$v.$invalid) {
                this.$v.$touch();
                return;
            }
        },
    },
    computed: {
        isReady() {
            return Object.keys(this.$v.$params).every(
                (key) => this.$v[key].$model && !this.$v[key].$error
            );
        },
    },
    validations: {
        name: {
            required,
            isName: (name) => /[a-zA-Zа-яА-Я\s]$/.test(name),
        },
        email: {
            required,
            email,
        },
        phone: {
            required,
            isNum: (val) =>
                /^((8|\+7)[\- ]?)?(\(?\d{3}\)?[\- ]?)?[\d\- ]{7,10}$/.test(val),
        },
        lang: { required, isSelected: (value) => value },
        checkpoint: {
            required,
        },
    },
};
</script>

<style>
@import "./style/bem-blocks/variables.css";

* {
    box-sizing: border-box;
}
#app {
    font-family: $font;
    -webkit-font-smoothing: antialiased;
    background: #fff;
    color: $black;
    height: 100%;
}
.select {
    position: relative;
    background-image: svg-load("./images/chevron.svg");
    background-repeat: no-repeat;
    background-size: initial;
    background-position: right 9px top 9px;
    &:visited {
        border-color: $blue;
    }
    &.active {
        border: 2px solid $blue;
        padding: 14px 0 13px 14px;
        span {
            color: $black;
        }
    }
    span {
        &.default {
            color: $light-oceanic;
        }
    }
}
.dropdown {
    position: absolute;

    left: 0;
    top: calc(100% + 4px);
    width: 100%;
    padding: 12px 0;
    background: $white;
    border-radius: 6px;
    border: 1px solid #dbe2ea;
    box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04),
        0px 20px 20px rgba(44, 39, 56, 0.04);
    &__item {
        font-size: 16px;
        line-height: 21px;
        color: $grey;
        padding: 12px 0 11px 15px;
        &:hover {
            background: $oceanic;
        }
    }
}
.bem-ckeckbox {
    display: flex;
    align-items: center;
    user-select: none;
    &__input {
        display: none;
        &:checked + span {
            background-image: svg-load("./images/check.svg");
            border-width: 2px;
            border-color: $blue;
        }
    }
    &__fake {
        width: 28px;
        height: 28px;
        background: $white;
        border: 1px solid $light-grey;
        box-sizing: border-box;
        box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
        border-radius: 4px;
    }
    &__text {
        margin-left: 8px;
        color: $grey;
        font-weight: 500;
        font-size: 16px;
        line-height: 21px;
    }
}
.auth {
    padding: 40px 30px;
    height: 100%;

    &__title {
        font-weight: bold;
        font-size: 34px;
        line-height: 44px;
    }
    &__text {
        margin-top: 8px;
        font-size: 16px;
        line-height: 22px;
    }
    &__link {
        color: $blue;
    }
    &-form {
        margin-top: 54px;
        min-width: 300px;
        width: 100%;
        &__error {
            font-size: 14px;
            line-height: 18px;
            color: $red;
            margin-top: 8px;
        }
        &__row {
            &:not(:first-child) {
                margin-top: 34px;
            }
            &-title {
                font-weight: 500;
                font-size: 16px;
                line-height: 21px;
                color: $grey;
            }
            &-input {
                user-select: none;
                margin-top: 8px;
                appearance: none;
                outline: none;
                width: 100%;
                color: $black;
                border: 1px solid $light-grey;
                box-shadow: 0px 4px 8px rgba(44, 39, 56, 0.04);
                border-radius: 6px;
                padding: 15px 0 14px 15px;
                font-weight: normal;
                font-family: $font;
                font-size: 16px;
                line-height: 21px;
                &::placeholder {
                    color: $light-oceanic;
                }
                &:focus {
                    border-color: $blue;
                    border-width: 2px;
                    padding: 14px 0 13px 14px;
                }
            }
            &-btn {
                width: 100%;
                height: 56px;
                text-align: center;
                background: $light-grey;
                box-shadow: 0px 2px 4px rgba(44, 39, 56, 0.08),
                    0px 4px 8px rgba(44, 39, 56, 0.08);
                border-radius: 6px;
                outline: none;
                border: none;
                color: $silver;
                cursor: pointer;
                font-family: $font;
                font-weight: 500;
                font-size: 16px;
                line-height: 21px;
                &.active {
                    background: $blue;
                    color: $oceanic;
                }
            }
        }
    }
}
</style>
