import { CracoConfig } from "@craco/types"
import { pathsToModuleNameMapper } from "ts-jest"
import { compilerOptions } from "./tsconfig.json"
import dotenv from "dotenv"
import path from "path"
const getEnvPath = () => {
    switch (process.env.NODE_ENV) {
        case "development":
            return "./env/.env.development"
        case "production":
            return "./env/.env.production"
        default:
            return "./env/.env.development"
    }
}
dotenv.config({ path: path.join(__dirname, getEnvPath()) })
const resolve = (dir: string) => path.resolve(__dirname, dir)
const config: CracoConfig = {
    webpack: {
        alias: {
            "@": resolve("src"),
            "@assets": resolve("src/assets"),
            "@components": resolve("src/components"),
            "@pages": resolve("src/pages"),
            "@utils": resolve("src/utils"),
            "@router": resolve("src/router"),
            "@api": resolve("src/api"),
            "@types": resolve("src/types"),
        },
        configure: (webpackConfig, { env, paths }) => {
            paths && (paths.appBuild = path.resolve(__dirname, "dist"))
            webpackConfig.output &&
                (webpackConfig.output.path = path.resolve(__dirname, "dist"))
            webpackConfig.module &&
                (webpackConfig.module.rules = [
                    {
                        test: /\.js$/,
                        exclude: /node_modules/,
                        use: {
                            loader: "babel-loader",
                        },
                    },
                    {
                        test: /\.tsx?$/,
                        exclude: /node_modules/,
                        use: [
                            {
                                loader: "ts-loader",
                                options: {
                                    transpileOnly: true,
                                },
                            },
                        ],
                    },
                    {
                        test: /\.css$/,
                        exclude: /node_modules/,
                        use: [
                            { loader: "style-loader" },
                            { loader: "css-loader" },
                        ],
                    },
                    {
                        test: /\.less$/,
                        exclude: /node_modules/,
                        use: [
                            { loader: "style-loader" },
                            { loader: "css-loader" },
                            {
                                loader: "less-loader",
                            },
                        ],
                    },
                ])

            return webpackConfig
        },
    },
    jest: {
        configure: {
            testPathIgnorePatterns: ["/node_modules/", "/dist/"],
            moduleNameMapper: pathsToModuleNameMapper(compilerOptions.paths, {
                prefix: "<rootDir>/",
            }),
        },
    },
    devServer: {
        port: 3000,
        proxy: {
            "/api": {
                // target: "http://localhost:3001",
                target: "http://localhost:4399",
                changeOrigin: true,
                // pathRewrite: {
                //     "^/api": "",
                // },
            },
        },
    },
}

module.exports = config
